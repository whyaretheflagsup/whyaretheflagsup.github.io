#!/bin/bash
set -e

python3 whyaretheflagsup.py --yaml ~/bin/data/whyaretheflagsup.yaml --image "images/flag.*" --no-web
