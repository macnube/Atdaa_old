# Atdaa

# Installation Instructions

1. Pull down repo into Atdaa directory
2. Run `npm install`
3. Run `react-native link`
4. Copy Podfile into ios directory
5. CD into ios directory and run `pod install`
6. Open up newly created xcode workspace file
7. Under main Atdaa target open up `AppDelegate.m`
..1. Below other imports add `@import GoogleMaps`
..2. Within launchOptions function add `[GMSServices provideAPIKey:@"API_KEY"];`
8. Go into node_modules/react-native-maps and drag the AirGoogleMaps folder to Xcode project
..1. Continue with default options
9. Copy all ImageAssets from ImageAssets at root directory into ios/Atdaa/Images.xcassets
10. Build and Run
