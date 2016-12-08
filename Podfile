# Uncomment this line to define a global platform for your project
# platform :ios, '9.0'

target 'Atdaa' do
  # Uncomment this line if you're using Swift or would like to use dynamic frameworks
  use_frameworks!

  # Pods for Atdaa

  pod 'React', path: '../node_modules/react-native', :subspecs => [
    'Core',
    'RCTActionSheet',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket'
  ]

  pod 'GoogleMaps'

  target 'AtdaaTests' do
    inherit! :search_paths
    # Pods for testing
  end

end
source 'https://github.com/CocoaPods/Specs.git'
#use_frameworks!
# platform :ios, '8.0'

[
  'Firebase',
  'Firebase/Core',
  'Firebase/Auth',
  'Firebase/Storage',
  'Firebase/Database',
  'Firebase/RemoteConfig',
  'Firebase/Messaging'
].each do |lib|
  pod lib
end
