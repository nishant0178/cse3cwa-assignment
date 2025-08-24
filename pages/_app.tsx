import Header from '../components/Header';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
