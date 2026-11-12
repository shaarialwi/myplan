import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Myplan — A little plan. A better day.',description:'Your meetings, journeys and everyday plans, all together.',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,statusBarStyle:'default',title:'Myplan'},icons:{icon:'/icon-192.png',apple:'/icon-192.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
