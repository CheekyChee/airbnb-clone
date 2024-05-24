import { Nunito } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import NavbarComponent from './components/navbar/Navbar';
import './globals.css';
import ToasterProvider from './provider/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

const fontNunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb ',
  description: 'Airbnb clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={fontNunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <SearchModal />
          <RentModal />
          <NavbarComponent currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
