
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";


interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="bg-amber-100  flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Toaster />
            <Footer />
        </div>
    );
};

export default MainLayout;
