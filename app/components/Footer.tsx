export default function Footer() {
    return (
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} Lottie Watermark Remover
          </p>
          <p className="text-center text-gray-500 text-sm mt-1">
            This tool is for educational purposes. Always respect copyright and licensing.
          </p>
        </div>
      </footer>
    );
  }
