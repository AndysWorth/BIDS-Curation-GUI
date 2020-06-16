# BIDS Curation Issues

What kinds of problems exist when converting a set of DICOM files into the Brain Imaging Data Structure (BIDS) format?

## General issues

### PHI
Protected Health Informaiton (PHI) must be avoided

### Files must be identified
Scanners create additional files

## Problems

### BIDS path/name collisions

This is where multiple DICOM files map to the same BIDS file path and name.

Causes:
* Scanning is interruted so a second scan with the same name is acquired.
* A functional task is run multiple times
