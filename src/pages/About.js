import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

// --- DUMMY REVIEWS DATA (unchanged) ---
const REVIEWS = [
  {
    id: 1,
    name: "Shima Parween",
    rating: 5,
    text: "Got my mehndi parcel 📦. Packaging is good especially the cone size is awesome 😊.",
    img: "/1.jpg"
  },
  {
    id: 2,
    name: "Nitu Kumari",
    rating: 4,
    text: " Bohot accha tha . Packing aur mehndi dono hi bohot acchi thi. Colour bhi bohot accha aaya aur mehndi bilkul organic thi 🌿. Market wali mehndi se zyada acchi lagi. Koi side effects nahi hue aur balm se better colour aaya lagane ke baad.❤️ ",
    img: "/2.jpeg"
  },
   {
    id: 3,
    name: "Mosarrat Ara",
    rating: 5,
    text: "The mehndi dried quickly and gave a beautiful, soft tint to my hands. It wasn't too dark or too light, just the perfect balance. Got so many compliments 💐",
    img: "/3.jpg"
  },
  {
    id: 4,
    name: "Shima Parween",
    rating: 5,
    text: "One thing that’s really good about your cone is the flow. The flow was amazing ✨. Baaki cones ka flow kaafi bekar hota hai... kabhi sookhe sookhe nikalte hain, kabhi zyada tezi se mote mote lines ban jaati hain. Lekin is cone ka flow bahot accha tha❤️ ❤️ ❤️.",
    img: "/4.jpg"
  },
   {
    id: 5,
    name: "Vikas Singh",
    rating: 5,
    text: "Main yeh mehndi cone apni sister ke liye Rakhi pe laaya tha, and she totally loved it 🎁. Colour bohot accha aaya aur kaafi din tak tikka raha. Usne bola ki texture smooth tha aur apply karna bhi easy tha. I'm really happy I chose this one!",
    img: "/5.jpeg"
  },
   {
    id: 6,
    name: "Osama Parween",
    rating: 5,
    text: "Waooo, Mashallah! Bahut accha colour aaya hai... dil khush ho gaya 😊. Bahut din se mere nails iska intezaar kar rahe the, and finally jab maine isko lagaya toh main iske stain se obsessed ho gayi. It’s so natural and beautiful 💅. Quick to apply, dries fast, and gives that perfect traditional tint without being too loud.",
    img: "/6.jpg"
  },
  {
    id: 7,
    name: " Aashna Naaz",
    rating: 5,
    text: "Bas aadha ghanta rakhi thi maine mehndi, aur colour bohot accha aaya hai 🌿",
    img: "/7.jpg"
  },
   {
    id: 8,
    name: "Nashra Rizwan",
    rating: 5,
    text: "I loved how smoothly the mehndi applied! The texture was perfect and the color turned out rich and deep in just an hour. Way better than anything I’ve used from the market 🌸",
    img: "/8.png"
  },
  {
    id: 9,
    name: "Sharmeen Hasan",
    rating: 4,
    text: "Mashallah, bahut acchi hai aapki nail cone. Mujhe kaafi pasand aayi.",
    img: "/9.png"
  },
  {
    id: 10,
    name: "Zirka Parween",
    rating: 5,
    text: "Mehndi ka colour bahut accha aaya hai 🤎",
    img: "/10.png"
  },
  {
    id: 11,
    name: " Farheen Mozahir",
    rating: 4,
    text: "Colour toh sach me bhut accha aaya hai",
    img: "/11.jpg"
  },
   {
    id: 12,
    name: "Zuberiya Parween",
    rating: 5,
    text: "The stain looked so natural and elegant. What I really liked is that there were no side effects at all & no itching, no burning. It's definitely 100% organic as promised 🌱",
    img: "/12.jpeg"
  },
  {
    id: 13,
    name: "Aafreen Jahan",
    rating: 5,
    text: "Mashallah, hum mehndi se bahut satisfied hue. Humne sirf ek ghanta rakha aur colour bilkul natural laga 💫",
    img: "/13.jpeg"
  },
  {
    id: 14,
    name: "Fazal Mallick",
    rating: 5,
    text: "Yeh mehndi maine apni wife ke liye li thi, aur unko bohot pasand aayi 💕. Colour bohot jaldi aaya aur stain bhi deep tha. Unhone bola ki mehndi bilkul natural thi, koi itching ya side effects nahi hue. Definitely dubara buy karunga ❤️‍🔥",
    img: "/14.jpeg"
  },
  {
    id: 15,
    name: "Lubna Fatma",
    rating: 4,
    text: "Mehndi ka color bahut accha aaya hai. Loved it",
    img: "/15.jpeg"
  },
  {
    id: 16,
    name: "Anam parween",
    rating: 5,
    text: "Mashallah! Bahut accha color aaya hai, Kafi dark colour aaya hai , mujhe accha laga aapka mehndi. 💖",
    img: "/16.jpeg"
  },
   {
    id: 17,
    name: "Gulafshan Parween",
    rating: 5,
    text: "I was impressed by the mild, pleasant scent of the mehndi 🌼. Not only did it smell great, but the color also lasted for days without fading. Will definitely repurchase!💗 💗 ",
    img: "/17.jpeg"
  },
  {
    id: 18,
    name: "Nagma Mallick",
    rating: 5,
    text: "Mehndi bahut accha tha, colour bhi bahut accha aaya hai 💖✨",
    img: "/18.jpeg"
  },
   {
    id: 19,
    name: "Mahi Alam",
    rating: 5,
    text: "Yeh mehndi maine apni mummy ke liye li thi, and she was super happy 🌟. Colour natural aur dark aaya, bilkul unko jaisa pasand hai. Koi chemical smell nahi thi, aur unhone bola ki bilkul purane zamane wali mehndi jaisa feel aaya 🕊️",
    img: "/19.jpg"
  }
];

// --- CERTIFICATES DATA: Use your local image path from public folder ---
const CERTIFICATES = [
  {
    img: "/certi 1.jpg",
    title: "Henna Art Certification",
  },
  {
    img: "/certi 2.jpg",
    title: "Araq Nail Certification"
  }
];

// --- Styled Components ---
const Page = styled.section`
  background: #f5f4f0;
  min-height: 100vh;
  font-family: 'Poppins', Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  max-width: 900px;
  margin: 3.2rem auto 2.5rem;
  padding: 2rem 1.5rem 2.5rem;
  border-radius: 1rem;
  background: #eceadd;
  box-shadow: 0 1px 12px rgba(104,96,48,0.07);
`;

const Heading = styled.h2`
  color: #40652a;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.3rem;
  letter-spacing: 0.02em;
`;

const Desc = styled.p`
  color: #4a4629;
  font-size: 1.13rem;
  line-height: 1.7;
  text-align: center;
  max-width: 680px;
  margin: 0 auto 2.8rem;
`;

const CertSection = styled.section`
  margin: 0 auto 2.5rem auto;
  text-align: center;
`;

const CertHeading = styled.h3`
  color: #7c6a43;
  font-size: 1.14rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  letter-spacing: 0.01em;
`;

const ReviewsBlock = styled.section` margin: 0 auto; `;
const ZigzagRow = styled.div`
  display: flex; align-items: center; gap: 2.1rem; margin-bottom: 2.8rem;
  flex-direction: ${({ right }) => right ? "row-reverse" : "row"};
  @media (max-width: 700px) { flex-direction: column; gap: 1.1rem; }
`;
const ImgArea = styled.div`
  flex: 0 0 124px; display: flex; align-items: center; justify-content: center;
  @media (max-width: 700px) { width: 100%; justify-content: center; margin-bottom: 0.15rem; }
`;
const CustomerImg = styled.img`
  width: 92px; height: 92px; object-fit: cover; border-radius: 50%;
  border: 4px solid #b9b08a;
  background: #e3decf;
  box-shadow: 0 2px 7px rgba(104, 90, 10, 0.15);
`;
const ReviewCard = styled.div`
  background: #f8f6ef;
  box-shadow: 0 2px 12px rgba(120, 70, 6, 0.07);
  border-radius: 1rem;
  padding: 1.2rem 1.3rem;
  flex: 1 1 0;
  display: flex; flex-direction: column;
  min-width: 0;
`;
const Rating = styled.div`
  color: #a89168;
  font-size: 1.15rem;
  margin-bottom: 0.3rem;
  letter-spacing: 0.13em;
`;
const Reviewer = styled.div`
  font-weight: 600;
  color: #40652a;
  font-size: 1.09rem;
  margin-bottom: 0.2rem;
`;
const ReviewText = styled.div`
  color: #564729;
  font-size: 1.06rem;
`;

export default function About() {
  return (
    <>
      <Page>
        <Container>
          {/* ABOUT US TOP */}
          <Heading>About Us</Heading>

          <Desc>
            Rooted in Nature. Crafted with Care. Trusted by You. 🌿
          </Desc>

          <Desc>
            At <b>Samrin Organic Mehndi</b>, we believe that beauty should never come at the cost of health or tradition. That’s why we are dedicated to offering pure, authentic, and 100% organic mehndi — made with love, honesty, and a deep respect for nature.
          </Desc>

          <Desc>
            We are a home-grown, family-run business with a modern vision and traditional soul. Har cone aur powder jo hum banate hain, uske peeche ek hi soch hoti hai — ki aapko mile sabse shudh aur natural mehndi, jo safe bhi ho aur beautiful bhi. Our products reflect everything we stand for — clean ingredients, simple processes, aur honest results.
          </Desc>

          <Desc>
            🌿 What We Do
          </Desc>

          <Desc>
            We create premium-quality mehndi using handpicked henna leaves, which are sun-dried, stone-ground, and carefully packed — bina kisi chemical ya artificial additive ke. Har step hum khud handle karte hain, taaki mehndi ka asli rang, mitti ki khushboo, aur softness bilkul waise hi bani rahe jaise nature ne banayi ho.
          </Desc>

          <Desc>
            Hamari mehndi:
          </Desc>

          <Desc>
            Deti hai rich, deep stain<br />
            Hai gentle on all skin types<br />
            No PPD, no synthetic dyes<br />
            Natural fragrance ke saath aati hai<br />
            Kaam karti hai hands, feet aur hair pe equally well
          </Desc>

          <Desc>
            Chahe aap bride ho ya bridesmaid, karwa chauth manaa rahe ho ya Eid — ya sirf ek shaant Sunday ko mehndi lagake relax karna chahte ho — <b>Samrin Organic Mehndi</b> hamesha ready hai aapke special moments ko aur bhi khubsurat banane ke liye.
          </Desc>

          <Desc>
            💚 Why Customers Love Us
          </Desc>

          <Desc>
            Market mehndi products mein chemical bhare hote hain. Par hum offer karte hain ek natural, safe alternative jo customers truly trust.
          </Desc>

          <Desc>
            ✅ Authenticity you can feel — koi shortcuts nahi<br />
            ✅ Smooth flow & easy application — artists ke favourite<br />
            ✅ Visible results in just 30–60 minutes<br />
            ✅ Safe for kids and sensitive skin too<br />
            ✅ Eco-friendly & hygienic packaging
          </Desc>

          <Desc>
            From casual users to pro mehndi artists, log hamare product ko sirf use nahi karte — woh isse feel karte hain. And that’s what sets <b>Samrin Organic Mehndi</b> apart.
          </Desc>

          <Desc>
            ✨ Our Mission
          </Desc>

          <Desc>
            We’re not just selling mehndi — hum ek tradition ko revive kar rahe hain, in a way that’s modern, clean, and inclusive.
          </Desc>

          <Desc>
            Our goal is to:<br />
            Promote organic Indian beauty rituals<br />
            Encourage people to embrace natural living<br />
            Build a community that values safe and honest self-care
          </Desc>

          <Desc>
            🙏 Thank You for Believing in Us
          </Desc>

          <Desc>
            Jab aap <b>Samrin Organic Mehndi</b> choose karte ho, aap sirf ek product nahi — ek sapna aur ek purpose ko support kar rahe hote ho.
          </Desc>

          <Desc>
            We’re here because of your trust, and we promise to keep working hard to deliver mehndi that’s natural, beautiful, and truly trusted.
          </Desc>

          <Desc>
            From our hands to yours — with care.<br />
            – Team <b>Samrin Organic Mehndi</b> 💚
          </Desc>

          {/* CERTIFICATES SECTION (vertical, full width, no border, no shadow) */}
          <CertSection>
            <CertHeading>Our Certificates</CertHeading>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.5rem",
              background: "none",
              boxShadow: "none",
              marginBottom: "0.1rem"
            }}>
              {CERTIFICATES.map(cert => (
                <div
                  key={cert.img}
                  style={{
                    width: "100%",
                    maxWidth: "820px", // or match Container maxWidth minus padding
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "none",
                    boxShadow: "none",
                    padding: 0,
                    border: "none"
                  }}
                >
                  <img
                    src={cert.img}
                    alt={cert.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                      border: "none",
                      boxShadow: "none",
                      background: "none",
                      marginBottom: "1em"
                    }}
                  />
                  <div style={{
                    color: "#40652a",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    margin: 0
                  }}>
                    {cert.title}
                  </div>
                </div>
              ))}
            </div>
          </CertSection>

          {/* CUSTOMER REVIEWS SECTION */}
          <Heading as="h3" style={{ fontSize: "1.32rem", margin: "2.7rem 0 1.4rem", letterSpacing: 0.01 }}>
            What Our Customers Say
          </Heading>
          <ReviewsBlock>
            {REVIEWS.map((r, idx) => (
              <ZigzagRow right={idx % 2 === 1} key={r.id}>
                <ImgArea>
                  <CustomerImg src={r.img} alt={r.name + " review customer"} loading="lazy" />
                </ImgArea>
                <ReviewCard>
                  <Rating>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </Rating>
                  <Reviewer>{r.name}</Reviewer>
                  <ReviewText>{r.text}</ReviewText>
                </ReviewCard>
              </ZigzagRow>
            ))}
          </ReviewsBlock>
        </Container>
      </Page>
      <Footer />
    </>
  );
}
