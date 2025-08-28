# 🐾 Claw - Pet Adoption & Marketplace App

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-0.79.0-blue.svg" alt="React Native Version">
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-lightgrey.svg" alt="Platform">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen.svg" alt="Status">
</div>

<div align="center">
  <h3>🏆 A modern, intuitive pet adoption platform connecting loving families with their perfect companions</h3>
</div>

---

## 📱 About Claw

**Claw** is a comprehensive React Native mobile application designed to revolutionize pet adoption and marketplace experiences. Built with love for animal welfare, this app bridges the gap between pet owners, adopters, and animal lovers in a seamless, user-friendly platform.

### ✨ Key Highlights

- 🎯 **Modern UI/UX**: Intuitive design with smooth animations and user-friendly navigation
- 🔐 **Secure Authentication**: JWT authentication system
- 📱 **Cross-Platform**: Native performance on both Android and iOS
- 🌐 **Real-time Data**: Live pet listings with instant updates
- 📸 **Image Management**: Advanced image picker with camera and gallery options
- 🔍 **Smart Filtering**: Advanced search and filtering capabilities
- 💝 **Favorites System**: Save and manage preferred pets
- 👤 **User Profiles**: Comprehensive user management system

---

## 🚀 Features

### 🏠 **Home Dashboard**
- Featured pets showcase
- Quick access to categories
- Recent activity feed
- Search functionality with voice input

### 🐕 **Pet Marketplace**
- Browse available pets by category
- Detailed pet profiles with multiple images
- Filter by type, location, price, and more
- Real-time availability status

### ➕ **Add Pet Listings**
- Easy pet registration process
- Image upload with camera/gallery integration
- Comprehensive pet information forms
- Location-based listing management

### 👤 **User Management**
- Secure user registration and login
- Profile customization
- Adoption history tracking
- Notification preferences

### 💖 **Saved Pets**
- Bookmark favorite pets
- Quick access to saved listings
- Comparison features
- Wishlist management

---

## 🛠️ Tech Stack

### **Frontend**
- **React Native** `0.79.0` - Cross-platform mobile development
- **React Navigation** `7.x` - Seamless navigation experience
- **TypeScript** - Type-safe development
- **React Hooks** - Modern state management
- **AsyncStorage** - For Local Storage

### **UI/UX**
- **React Native Vector Icons** - Beautiful iconography
- **Lottie React Native** - Smooth animations
- **React Native Modal** - Enhanced modal experiences
- **Custom Components** - Reusable UI elements

### **Backend Integration**
- **Axios** - HTTP client for API communication
- **RESTful APIs** - Backend communication
- **JSON** - Data exchange format
- **JWT** - JSON Web Tokek

### **Device Features**
- **React Native Image Picker** - Camera and gallery access
- **AsyncStorage** - Local data persistence
- **Firebase Messaging** - Push notifications
- **Safe Area Context** - Device-specific UI adaptation

### **Development Tools**
- **Metro** - JavaScript bundler
- **Jest** - Testing framework
- **ESLint** - Code quality assurance
- **Prettier** - Code formatting

---

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** `≥ 16.0.0`
- **React Native CLI** `≥ 18.0.0`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **CocoaPods** (for iOS dependencies)
- **JDK** `11` or higher

---

## ⚡ Quick Start

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/yourusername/Claw_App.git
cd Claw_App
```

### 2️⃣ **Install Dependencies**
```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### 3️⃣ **iOS Setup** (macOS only)
```bash
# Install CocoaPods dependencies
cd ios
bundle install
bundle exec pod install
cd ..
```

### 4️⃣ **Start Metro Server**
```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

### 5️⃣ **Run the Application**

#### **Android** 📱
```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### **iOS** 🍎
```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

---

## 📂 Project Structure

```
Claw_App/
├── 📱 android/               # Android native code
├── 🍎 ios/                   # iOS native code
├── 📦 src/                   # Source code
│   ├── 🧩 components/        # Reusable UI components
│   │   ├── CategoryDropdown.jsx
│   │   ├── GenderDropdown.jsx
│   │   ├── Loader.jsx
│   │   ├── LocationDropdown.jsx
│   │   ├── NeuteredDropdown.jsx
│   │   ├── TypeDropdown.jsx
│   │   └── UserRoleDropdown.jsx
│   └── 📱 screens/           # Application screens
│       ├── AddPet.jsx
│       ├── Home.jsx
│       ├── Login.jsx
│       ├── PetDetails.jsx
│       ├── Pets.jsx
│       ├── Profile.jsx
│       ├── SavedPets.jsx
│       └── SignUp.jsx
├── 🎨 public/assets/         # Static assets
│   ├── images/               # App images
│   ├── js/                   # JavaScript assets
│   └── loader/               # Animation files
├── 🧪 __tests__/             # Test files
├── 📄 App.jsx                # Main application component
├── 🔧 package.json           # Project dependencies
└── 📖 README.md              # Project documentation
```

---

## 🎯 Key Components

### **Smart Dropdowns**
- `CategoryDropdown` - Pet category selection
- `GenderDropdown` - Gender filtering
- `LocationDropdown` - City-based filtering
- `TypeDropdown` - Pet type selection
- `NeuteredDropdown` - Neutering status
- `UserRoleDropdown` - User role management

### **Core Screens**
- `Home` - Main dashboard with featured content
- `Pets` - Pet marketplace with filtering
- `AddPet` - Pet listing creation
- `PetDetails` - Detailed pet information
- `Profile` - User account management
- `SavedPets` - Favorites management
- `Login/SignUp` - Authentication flows

---

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:
```env
API_BASE_URL=https://backend.yourclaw.tech/api
FIREBASE_CONFIG=your_firebase_config
```

### **Android Configuration**
- Target SDK: 34
- Min SDK: 21
- Compile SDK: 34

### **iOS Configuration**
- iOS Deployment Target: 12.0
- Swift Version: 5.0

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## 📱 Screenshots & Demo

> **Note**: Add your app screenshots here to showcase the beautiful UI

| Home Screen | Pet Listings | Pet Details | User Profile |
|-------------|--------------|-------------|--------------|
| 🏠 | 🐕 | 📋 | 👤 |

## 📥 Download & Try the App

<div align="center">
  
### 🚀 **Ready to Experience Claw?**

<a href="https://github.com/yourusername/Claw_App/releases/latest/download/claw-app.apk">
  <img src="https://img.shields.io/badge/Download%20APK-Android-green?style=for-the-badge&logo=android&logoColor=white" alt="Download APK">
</a>

<a href="https://github.com/yourusername/Claw_App/releases">
  <img src="https://img.shields.io/badge/All%20Releases-GitHub-blue?style=for-the-badge&logo=github&logoColor=white" alt="All Releases">
</a>

</div>

### 📋 **Installation Instructions**

#### **Android APK Installation**
1. **Download** the APK file from the link above
2. **Enable** "Install from Unknown Sources" in your Android settings
3. **Locate** the downloaded APK file in your device
4. **Tap** to install and follow the prompts
5. **Launch** Claw from your app drawer

#### **System Requirements**
- 📱 **Android**: 5.0 (API level 21) or higher
- 💾 **Storage**: 50MB free space
- 🌐 **Network**: Internet connection required
- 📷 **Permissions**: Camera, Storage (for pet photos)

#### **Beta Testing**
Want to test the latest features? Join our beta program:
- 🧪 **Beta APK**: Available in [Releases](https://github.com/yourusername/Claw_App/releases) (marked as pre-release)
- 🐛 **Report Issues**: Use our [Issue Tracker](https://github.com/yourusername/Claw_App/issues)
- 💡 **Feature Requests**: Share your ideas in [Discussions](https://github.com/yourusername/Claw_App/discussions)

---

## 🚢 Deployment

### **Android APK Build**
```bash
cd android
./gradlew assembleRelease
```

### **iOS Archive**
```bash
cd ios
xcodebuild -workspace Claw_App.xcworkspace -scheme Claw_App archive
```

### **Production Build**
```bash
# Generate production bundle
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. ✅ **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🔀 **Open** a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support & Troubleshooting

### **Common Issues**

#### **Metro bundler issues**
```bash
# Reset Metro cache
npx react-native start --reset-cache
```

#### **Android build errors**
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

#### **iOS pod errors**
```bash
# Reinstall pods
cd ios
rm -rf Pods
rm Podfile.lock
bundle exec pod install
cd ..
```

### **Get Help**
- 📧 **Email**: support@yourclaw.tech
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/Claw_App/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/Claw_App/discussions)

---

## 🙏 Acknowledgments

- 🐾 **Animal Welfare Organizations** - For inspiring this project
- 👥 **Open Source Community** - For amazing libraries and tools
- 🎨 **Design Community** - For UI/UX inspiration
- 🧑‍💻 **React Native Team** - For the incredible framework

---

## 📊 Project Stats

- 📅 **Started**: 2024
- 💻 **Language**: JavaScript/TypeScript
- 📱 **Platform**: React Native
- 🎯 **Purpose**: Pet Adoption & Marketplace
- 🌟 **Status**: Active Development

---

<div align="center">
  <h3>Made with ❤️ for our furry friends</h3>
  <p>🐕 🐱 🐰 🐹 🐦 🐢</p>
  
  **Star ⭐ this repository if you found it helpful!**
</div>
