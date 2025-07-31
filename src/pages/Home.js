import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import Footer from '../components/Footer';

// === FIREBASE IMPORTS ===
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // <-- adjust if your firebase.js is elsewhere

const Page = styled.main`
  background: #f5f4f0; color: #2e4d25; min-height: 100vh; display: flex; flex-direction: column;
`;
const CarouselWrapper = styled.section`
  width: 100vw; margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%);
`;
const SlideImage = styled.img`
  width: 100vw;
  height: auto;
  max-width: 100vw;
  max-height: 380px;
  min-height: 140px;
  object-fit: contain;
  background: #eceadd;
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  box-shadow: 0 5px 18px 0 rgba(65,40,15,0.07);
  margin-left: auto;
  margin-right: auto;
  display: block;

  @media (max-width: 600px) {
    max-height: 170px;
    border-radius: 0 0 1rem 1rem;
  }
`;


const Intro = styled.section`
  max-width: 780px; margin: 2.2rem auto 0; text-align: center; padding: 0 1rem;
`;
const Heading = styled.h1`
  color: #40652a; font-size: 2.3rem; font-weight: 700; margin-bottom: 0.35rem; letter-spacing: 0.02em;
`;
const SubHeading = styled.h2`
  color: #7c6a43;
  font-size: 1.2rem; font-weight: 400; margin-bottom: 1.5rem; letter-spacing: 0.01em;
`;
const ProductsArea = styled.section`
  max-width: 1120px; margin: 2rem auto 2.5rem; padding: 2.2rem 1.2rem;
  background: #eceadd;
  border-radius: 1.07rem;
  box-shadow: 0 2px 14px rgba(104,96,48,0.07);
`;
const ProductsGrid = styled.div`
  display: grid;
  grid-gap: 2.1rem;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 600px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 950px) { grid-template-columns: repeat(3, 1fr); }
  margin-bottom: 1rem;
`;
const Card = styled.div`
  background: #f8f6ef;
  border-radius: 1rem;
  box-shadow: 0 3px 14px rgba(120, 70, 6, 0.09);
  padding: 1.3rem 1.1rem 1.5rem;
  display: flex; flex-direction: column; align-items: center;
  transition: transform 0.15s, box-shadow 0.25s;
  &:hover {
    transform: translateY(-7px) scale(1.03);
    box-shadow: 0 12px 28px rgba(120, 70, 6, 0.13);
  }
`;
const ProductImg = styled.img`
  width: 171px;      // Increased from 143px
  height: 171px;     // Increased from 143px
  object-fit: cover;
  border-radius: 0.7rem;
  box-shadow: 0 2px 7px rgba(120, 100, 30, 0.13);
  margin-bottom: 1.1rem;
  background: #e3decf;
`;

const ProductTitle = styled.div`
  font-size: 1.14rem; font-weight: 700; color: #3e5321; margin-bottom: 0.18rem; text-align: center;
`;
const ProductLabel = styled.div`
  background: linear-gradient(90deg, #a89168 60%, #c9c57d 100%);
  color: #fff; font-size: 0.98rem; font-weight: 600;
  padding: 0.27em 1em;
  border-radius: 1em;
  margin-bottom: 0.34rem; letter-spacing:0.04em; display: inline-block;
`;
const ProductQty = styled.div`
  color: #665429; font-size: 1rem; font-weight: 500; margin-bottom: 1.2rem;
`;
const ProductPrice = styled.div`
  color: #40652a; font-size: 1.05rem; font-weight: 600; margin-bottom: 1rem;
`;
const ButtonsRow = styled.div`
  display: flex; flex-direction: row; gap: 0.65rem; width: 100%; margin-top: auto; justify-content: center;
`;
const Button = styled.button`
  flex: 1 1 0; min-width: 96px;
  background: ${({variant}) => variant === 'primary'
    ? "linear-gradient(90deg, #40652a 60%, #a89168 100%)"
    : "#fff"};
  color: ${({variant}) => variant === 'primary' ? "#fffef6" : "#40652a"};
  border: ${({variant}) => variant === 'primary' ? "none" : "1px solid #a89168"};
  padding: 0.54em 0.1em; font-size: 1.01rem; font-weight: 600;
  border-radius: 0.6em; margin-top: 0.06em;
  box-shadow: 0 1.5px 3px rgba(104,96,48,0.06);
  cursor: pointer;
  transition: background 0.18s, color 0.16s, box-shadow 0.19s, border 0.16s;
  &:active { filter: brightness(0.97);}
  &:hover {
    background: ${({variant}) => variant === 'primary'
      ? "linear-gradient(90deg, #4c7835 70%, #b5996c 100%)"
      : "#e6ebd7"};
    color: ${({variant}) => variant === 'primary' ? "#fff" : "#5d4517"};
    border-color: #b5996c;
  }
`;
const Notification = styled.div`
  background: #e5f9de; color: #3d6920; border-radius: 0.6em;
  margin: 1.1rem auto 0; padding: 0.8rem 1em; max-width: 390px; text-align: center;
  font-weight: 600; font-size: 1.08rem; letter-spacing: 0.01em;
`;

// --- Update sliderImages with your own local image(s) ---
const sliderImages = [
  "/i0.jpg",
  "/i1.jpg",
  "/i2.jpg",
  "/i3.jpg", // <-- add your image file(s) here (placed in public folder)
  "/i4.jpg",
  "/i5.jpg",
  "/i6.jpg",
  "/i7.jpg",
  "/i8.jpg",
  "/i9.jpg",
  // You can add more: "/mehndi-organic/banner2.jpg",
];

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4500,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  adaptiveHeight: true,
  fade: false,
};

export default function Home() {
  const [notif, setNotif] = useState('');
  const [adding, setAdding] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from Firestore
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const snap = await getDocs(collection(db, "products"));
        const arr = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(arr);
      } catch(e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  function onAddToCart(product) {
    setAdding(product.id);
    const prevCart = JSON.parse(localStorage.getItem('mehndi_cart') || '[]');
    const found = prevCart.find(item => item.id === product.id);
    let newCart;
    if (found) {
      newCart = prevCart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      newCart = [
        ...prevCart,
        {
          id: product.id,
          name: product.title ?? product.name,
          price: product.price,
          qty: 1,
        }
      ];
    }
    localStorage.setItem('mehndi_cart', JSON.stringify(newCart));
    setNotif(`Added "${product.title ?? product.name}" to your cart!`);
    setTimeout(() => { setNotif(''); setAdding(null); }, 1500);
  }

  function onBuyNow(product) {
    const newCart = [{
      id: product.id,
      name: product.title ?? product.name,
      price: product.price,
      qty: 1
    }];
    localStorage.setItem('mehndi_cart', JSON.stringify(newCart));
    window.location.href = '/payment';
  }

  return (
    <>
      <Page>
        {/* IMAGE SLIDER */}
        <CarouselWrapper>
          <Slider {...sliderSettings}>
            {sliderImages.map((img, idx) => (
              <div key={idx}>
                <SlideImage src={img} alt={`Mehndi ${idx + 1}`} />
              </div>
            ))}
          </Slider>
        </CarouselWrapper>

        {/* INTRO */}
        <Intro>
          <Heading>100% Organic Mehndi</Heading>
          <SubHeading>Natural. Pure. Traditional.</SubHeading>
        </Intro>

        {/* PRODUCT CARDS */}
        <ProductsArea>
          <h3
            style={{
              color: "#40652a",
              fontWeight: 700,
              fontSize: "1.25rem",
              textAlign: "center",
              marginBottom: "1.9rem",
              letterSpacing: "0.01em",
            }}
          >
            Our Products
          </h3>
          <ProductsGrid>
            {loading ? (
              <div style={{gridColumn: '1/-1', color: "#aaa", textAlign: "center"}}>Loading...</div>
            ) : products.length === 0 ? (
              <div style={{ color: "#958645", fontWeight: 600, gridColumn: "1/-1", textAlign: "center" }}>No products available.</div>
            ) : (
              products.map((product) => (
                <Card key={product.id}>
                  <ProductImg
                    src={product.image || product.img || sliderImages[0]}
                    alt={product.title || product.name}
                    loading="lazy"
                  />
                  <ProductTitle>{product.title || product.name}</ProductTitle>
                  {product.label && <ProductLabel>{product.label}</ProductLabel>}
                  {product.quantity && <ProductQty>{product.quantity}</ProductQty>}
                  <ProductPrice>₹{product.price}</ProductPrice>
                  <ButtonsRow>
                    <Button
                      variant="secondary"
                      onClick={() => onAddToCart(product)}
                      aria-label={`Add ${product.title || product.name} to cart`}
                      disabled={adding === product.id}
                    >
                      {adding === product.id ? "Added!" : "Add to Cart"}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => onBuyNow(product)}
                      aria-label={`Buy ${product.title || product.name} now`}
                    >
                      Buy Now
                    </Button>
                  </ButtonsRow>
                </Card>
              ))
            )}
          </ProductsGrid>
          {notif && <Notification>{notif}</Notification>}
        </ProductsArea>
      </Page>
      <Footer />
    </>
  );
}
