import React from 'react'
export default function Footer() {
    return (
        <div>
            <footer className="bg-[#10A293] text-white fixed bottom-0 left-0 right-0">
                <div className="flex pl-3 items-center h-16  text-white relative shadow-xl rounded-b-xl font-semibold" role="navigation">
                    <div className="flex items-center">
                        <div className="flex space-x-10">
                            <p className="text-white">© 2023 Maj ♥</p>
                            <a href="/about" className="text-white hover:text-slate-300">O nas</a>
                            <a href="/contact" className="text-white hover:text-slate-300">Kontakt</a>
                            <a href="/terms" className="text-white hover:text-slate-300">Pogoji</a>
                            <a href="/privacy" className="text-white hover:text-slate-300">Zasebnost</a>

                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}
