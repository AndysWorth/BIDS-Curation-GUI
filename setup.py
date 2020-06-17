import versioneer
from setuptools import setup, find_packages

setup(
    name='bids_curation_gui',
    version=versioneer.get_version(),
    cmdclass=versioneer.get_cmdclass(),
    description='bids_curation_gui is a Flask+React web app',
    author='Many',
    packages=find_packages(),
    include_package_data=True,
    license='MIT'
)
