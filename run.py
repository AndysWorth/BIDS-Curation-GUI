#!/usr/bin/env python3
"""Run BIDS curation GUI given input and output directories."""

import os
import json
import datetime
import subprocess as sp
import sys
import argparse
import time


APP_NAME = "bids_curation_gui"
IMAGE = "bids_curation_gui"

def main():

    if args.verbose:
        print('\nRunning BIDS Curation GUI\n')

    if args.shell:
        entry = '/bin/bash'
        dash_args = 'ti'
    else:
        entry = 'run.py'
        dash_args = 't'

    cwd = os.getcwd()

    cmds = []

    cmd = "docker run --rm --name parcel " + \
          "-p 5001:5001 " + \
          f"-v {cwd}/{APP_NAME}/static:/usr/src/app/{APP_NAME}/static " + \
          f"{IMAGE}:jsdev " +  \
          "npm run watch -- --hmr-port 5001 "
    cmds.append(cmd)

    cmd = "docker run --rm --name flask " + \
          f"-e FLASK_APP={APP_NAME} " + \
          "-e FLASK_DEBUG=1 " + \
          "-e SECRET_KEY=dev-key " + \
          f"-e INPUT={args.input} " + \
          f"-e OUTPUT={args.output} " + \
          f"-v {cwd}:/usr/src/app " + \
          "-p 5000:5000 " + \
          f"{IMAGE}:pydev " + \
          "flask run -h 0.0.0.0 "
    cmds.append(cmd)

    for cmd in cmds:
        print('Command:\n\n'+cmd+'\n')

        command = [ w for w in cmd.split() ]

        result = sp.Popen(command, universal_newlines=True)

        if args.verbose:
            print(f'{cmd.split()[:2]} return code: '+str(result.returncode))
            print('output: \n' + str(result.stdout))

    time.sleep(10)
    print("\n\n\nNow open this link: http://localhost:5000/\n\n\n")



if __name__ == '__main__':

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input",help="input directory (contains DICOMS)")
    parser.add_argument("output",help="output directory")
    parser.add_argument("-s", "--shell", action="store_true",
                        help="run bash in the container instead of run.py.")
    parser.add_argument("-v", "--verbose", action="store_true",
                        help="Print what is going on.")
    args = parser.parse_args()

    main()
