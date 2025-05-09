# LottieLab Watermark Remover

A simple and effective web application that removes LottieLab watermarks from Lottie animation files without requiring a subscription or payment.

## 🌟 Why We Built This

While creating web and mobile applications, we often need to customize Lottie animations downloaded from official sources. [LottieLab](https://www.lottielab.com/) is a great tool for editing these animations, but it adds a watermark to exported files unless you pay for a subscription.

This project arose from the need to have a free, simple solution for removing these watermarks from Lottie JSON files. Instead of requiring users to run scripts locally or understand how to modify JSON, we've wrapped our solution in an easy-to-use web interface that anyone can access.

## ✨ Features

- **Simple Interface**: Upload your watermarked Lottie JSON, get a clean version back
- **Browser-Based**: No installation needed, works on any device
- **Privacy Focused**: Files are processed in your browser, not uploaded to any server
- **Free Forever**: No subscriptions, no payment required
- **Fast Processing**: Watermarks are removed instantly

## 📱 Demo

Watch how easy it is to use the Lottie Watermark Remover:

[![▶️ Lottie Watermark Remover Demo](https://img.youtube.com/vi/PeAiJ_GESDE/0.jpg)](https://youtu.be/PeAiJ_GESDE)

## 🚀 Getting Started

### As a User

1. Visit our website [https://lottiehub-watermark-remover.vercel.app/]
2. Upload your watermarked Lottie JSON file
3. Download the cleaned animation
4. Use in your projects without any watermarks!

### For Developers

If you want to run this project locally:

```bash
# Clone the repository
git clone https://github.com/Subramanyarao11/lottiehub-watermark-remover

# Navigate to project directory
cd lottiehub-watermark-remover

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to see the app running locally.

## 🧰 How It Works

The application identifies and removes the watermark layer that LottieLab adds to exported animations. The watermark is typically a shape layer with a very high index value (`ind: 12345679`).

The core functionality is based on a simple JSON transformation that:
1. Parses the Lottie JSON file
2. Identifies the watermark layer
3. Removes this layer from the animation
4. Returns the cleaned JSON

## 💻 Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **File Processing**: Browser-based JavaScript

**Note**: This tool is provided for educational and personal use. Please support the creators of tools like LottieLab when using them for commercial projects.
