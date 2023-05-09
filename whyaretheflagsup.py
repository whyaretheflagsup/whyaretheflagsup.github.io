#!/usr/bin/env python
"""
Scrape'n'toot when the flags are up
"""
from __future__ import annotations

import argparse
import datetime
import glob
import random
import sys
import webbrowser

import chromedriver_autoinstaller  # pip install chromedriver-autoinstaller
import yaml  # pip install PyYAML
from bs4 import BeautifulSoup  # pip install bs4
from mastodon import Mastodon  # pip install Mastodon.py
from selenium import webdriver  # pip install selenium
from selenium.webdriver.chrome.options import Options

# No geolocation on Mastodon
# HELSINKI_LAT = 60.170833
# HELSINKI_LONG = 24.9375


def timestamp():
    """Print a timestamp and the filename with path"""
    print(datetime.datetime.now().strftime("%A, %d. %B %Y %I:%M%p") + " " + __file__)


def flag_reason():
    url = "https://whyaretheflagsup.github.io"

    chromedriver_autoinstaller.install()
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, "html.parser")

    # <div class="reason" id="reason"></div>

    reason_div = soup.find_all("span", class_="reason")[0]
    reason = reason_div.text
    if "Flags are not up in Finland today" in reason:
        return None
    return reason


def load_yaml(filename: str) -> dict[str, str]:
    """
    File should contain:
    mastodon_client_id: TODO_ENTER_YOURS
    mastodon_client_secret: TODO_ENTER_YOURS
    mastodon_access_token: TODO_ENTER_YOURS
    """
    with open(filename) as f:
        data = yaml.safe_load(f)

    if not data.keys() >= {
        "mastodon_client_id",
        "mastodon_client_secret",
        "mastodon_access_token",
    }:
        sys.exit(f"Mastodon credentials missing from YAML: {filename}")
    return data


def build_toot(reason):
    toot = "Flags are up in Finland because today is: " + reason

    # An HTTPS link takes 23 characters.
    max_length = 500 - 1 - 23  # max tweet with image - space - link
    if len(toot) > max_length:
        toot = toot[: max_length - 1] + "…"

    url = "https://whyaretheflagsup.github.io"
    toot += " " + url
    return toot


def random_img(spec):
    """Find images (non-recursively) in dirname"""
    # Get a list of matching images, full path
    matches = glob.glob(spec)
    print("Found", len(matches), "images")

    if not len(matches):
        sys.exit("No files found matching " + spec)

    # Pick a random image from the list
    random_image = random.choice(matches)
    print("Random image:", random_image)
    return random_image


def toot_it(
    status: str,
    credentials: dict[str, str],
    image_path: str = None,
    *,
    test: bool = False,
    no_web: bool = False,
) -> None:
    """Toot using credentials"""
    if len(status) <= 0:
        return

    # Create and authorise an app with (read and) write access following:
    # https://gist.github.com/aparrish/661fca5ce7b4882a8c6823db12d42d26
    # Store credentials in YAML file
    api = Mastodon(
        credentials["mastodon_client_id"],
        credentials["mastodon_client_secret"],
        credentials["mastodon_access_token"],
        api_base_url="https://botsin.space",
    )

    print("TOOTING THIS:\n", status)

    if test:
        print("(Test mode, not actually tooting)")
        return

    media_ids = []
    if image_path:
        print("Upload image")

        media = api.media_post(media_file=image_path)
        media_ids.append(media["id"])

    # No geolocation on Mastodon
    # https://github.com/mastodon/mastodon/issues/8340
    toot = api.status_post(status, media_ids=media_ids, visibility="public")

    url = toot["url"]
    print("Tooted:\n" + url)
    if not no_web:
        webbrowser.open(url, new=2)  # 2 = open in a new tab, if possible


def main() -> None:
    timestamp()
    parser = argparse.ArgumentParser(
        description="Scrape'n'toot when the flags are up",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "-y",
        "--yaml",
        default="/Users/hugo/Dropbox/bin/data/whyaretheflagsup.yaml",
        help="YAML file location containing Mastodon keys and secrets",
    )
    parser.add_argument(
        "-i",
        "--image",
        default="images/flag*",
        help="Path to an image of a flag to upload",
    )
    parser.add_argument(
        "-nw",
        "--no-web",
        action="store_true",
        help="Don't open a web browser to show the tooted toot",
    )
    parser.add_argument(
        "-x",
        "--test",
        action="store_true",
        help="Test mode: go through the motions but don't toot anything",
    )
    args = parser.parse_args()

    reason = flag_reason()
    if not reason:
        print("Flags are (probably) not up")
        sys.exit()

    print("Flags are up!")
    print(reason)

    status = build_toot(reason)

    credentials = load_yaml(args.yaml)

    print("Toot this:\n", status)
    image_path = random_img(args.image)
    toot_it(status, credentials, image_path, test=args.test, no_web=args.no_web)


if __name__ == "__main__":
    main()
