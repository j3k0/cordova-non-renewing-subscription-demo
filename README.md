#

In the below tutorial, I enter into details about installing Cordova and create a project. Feel free to skip those steps.

## Install NodeJS and Cordova

Below is my way of doing it (on Linux/OSX), using nvm (the Node Version Manager). Feel free to use your own way.

The idea is that a project should include all its required dependencies, including cordova. So it's easy for another developer (including future-you) to jump in and retrieve the exact same environment.

Create a project directory

```bash
mkdir my-project
cd my-project`
```

Create a `setenv` file with the following content.

```bash
NODE_VERSION=v5.0.0
nvm ls $NODE_VERSION || nvm install $NODE_VERSION
nvm use $NODE_VERSION
export PATH="$(pwd)/node_modules/.bin:$PATH"
```

Then run the following.

    . setenv

    npm init
    # Answer a few questions here...

    npm install --save cordova

Now you have cordova installed in the node_modules folder, the `setenv` file took care of updating the `PATH` so it's accessible from everywhere (in a terminal in which you typed `. setenv` in this project folder).

## Create the project

Let's create the project, add iOS and Android platforms.

    cordova create cordova-app cc.fovea.purchase.demo "Cordova Non-Renewing Subscription Demo"
    cd cordova-app
    cordova platform add ios --save
    cordova platform add android --save

## Setup the iOS app on iTunes Connect

## Setup the Android app on Google Play

## Install the plugin

    cordova plugin add cc.fovea.cordova.purchase --save --variable BILLING_KEY="MIIBaBcDeFgHiJkLmNoP/1234"

