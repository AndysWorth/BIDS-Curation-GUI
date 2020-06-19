#!/usr/bin/env python3
"""Run BIDS curation GUI given input and output directories."""

import os
import json
import datetime
import subprocess as sp
import sys
import argparse


APP_NAME = "bids_curation_gui"
IMAGE = "bids_curation_gui"

def main():

    if args.verbose:
        print('\nRunning BIDS Curation GUI\n')

    cmds = []

    cmds = [
        'docker stop parcel',
        'docker rm parcel',
        'docker stop flask',
        'docker rm flask',
        ]

    for cmd in cmds:

        print('Command:\n\n'+cmd+'\n')

        command = [ w for w in cmd.split() ]

        result = sp.run(command, universal_newlines=True)

        if args.verbose:
            print(f'{cmd.split()[:2]} return code: '+str(result.returncode))
            print('output: \n' + str(result.stdout))


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("-v", "--verbose", action="store_true",
                        help="Print what is going on.")
    args = parser.parse_args()

    main()
