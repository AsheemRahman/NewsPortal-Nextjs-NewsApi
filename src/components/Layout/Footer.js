export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-600 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} News Portal | Powered by NewsPortal
                        </p>
                    </div>

                    <div className="flex space-x-4">
                        <a href="#"  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            About
                        </a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            Terms
                        </a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}