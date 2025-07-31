import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Update path if needed

// Quick inline styles for +/–/🗑️
const qtyBtnStyle = {
  background: "#e5e8d7",
  border: "1px solid #b9b08a",
  borderRadius: "4px",
  width: 26,
  height: 26,
  fontWeight: 700,
  color: "#40652a",
  cursor: "pointer",
  fontSize: 19,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 2px"
};
const remBtnStyle = {
  background: "none",
  border: "none",
  fontSize: 18,
  color: "#bb2d2d",
  marginLeft: 8,
  cursor: "pointer"
};

const Page = styled.section`
  background: #f5f4f0;
  min-height: 100vh;
  font-family: 'Poppins', Arial, sans-serif;
`;
const MainBox = styled.div`
  max-width: 860px;
  margin: 2rem auto 2rem;
  display: flex; flex-direction: row; gap: 2.5rem; align-items: flex-start;
  background: #eceadd; box-shadow:0 1.5px 12px rgba(104,96,48,0.07); border-radius: 1.1rem;
  padding: 2rem 1.3rem;
  @media (max-width: 900px) {
    flex-direction: column; gap: 1.5rem; padding: 1.2rem 0.9rem;
  }
`;
const OrderCol = styled.div`
  flex: 1.1 1 0;
  min-width: 260px;
  margin-right: 1rem;
  @media (max-width: 900px) { margin-right: 0; }
`;
const FormCol = styled.div`
  flex: 1.5 1 0;
  min-width: 0;
`;
const Heading = styled.h2`
  color: #40652a;
  font-size: 1.5rem; font-weight:700; letter-spacing: 0.02em; margin: 0 0 1.3em;
`;
const Subheading = styled.h3`
  color: #7c6a43; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.2em;
`;
const OrderTable = styled.div`
  background: #f8f6ef; border-radius: 0.9rem;
  padding: 1.2rem 0.7rem 1rem;
  box-shadow: 0 2px 7px rgba(120,70,6,0.05);
`;
const Row = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  font-size: ${({total}) => total ? "1.13rem" : "1.01rem"};
  font-weight: ${({total}) => total ? 700 : 500};
  color: ${({total}) => total ? "#3e5321": "#483b21"};
  border-bottom: ${({last}) => last ? "none":"1px dashed #dbd4b8"};
  margin: 0.13em 0;
  padding-bottom: ${({last}) => last ? 0 : "0.42em"};
  padding-top: 0.09em;
`;
const TableHead = styled.div`
  font-weight: 700; color: #444; font-size: 1.04rem; margin-bottom: 0.6em;
  border-bottom: 2px solid #a89168;
  padding-bottom: 0.32em;
  display: flex; justify-content: space-between;
`;
const TotalRow = styled(Row)`
  border-top: 2px solid #a89168;
  padding-top: 0.62em; margin-top: 0.7em;
`;
const Note = styled.div`
  background: #e9e3d0; color: #40652a;
  border-radius: 0.45em;
  padding: 0.68em 1em; font-size: 0.97rem; text-align: center;
  margin: 1.5em auto 0.65em; max-width: 320px;
`;
const FormBox = styled.form`
  background: #f8f6ef;
  border-radius: 1rem;
  box-shadow: 0 2px 7px rgba(120,70,6,0.07);
  padding: 1.2rem 1.1rem 0.6rem;
  margin-bottom: 0.7rem;
  display: flex; flex-direction: column; gap: 1rem;
`;
const Field = styled.div`
  display: flex; flex-direction: column; margin-bottom: 0.7em;
`;
const Label = styled.label`
  color: #897d56;
  font-size: 0.99rem;
  font-weight: 500;
  margin-bottom: 0.19em;
`;
const Input = styled.input`
  padding: 0.55em 0.98em;
  border-radius: 0.43em;
  border: 1px solid #b9b08a;
  background: #fffdf7;
  font-size: 1rem;
  margin-bottom: 0.05em;
`;
const PaymentSection = styled.div`
  margin: 0.8rem 0 0.45rem;
  display: flex; flex-wrap: wrap; gap: 0.7rem 1.4rem;
`;
const PaymentBtn = styled.button`
  font-size: 1.03rem;
  font-weight: 600;
  color: ${({selected}) => selected ? "#fff" : "#40652a"};
  background: ${({selected}) =>
    selected ? "linear-gradient(90deg, #40652a, #a89168)" : "#eceadd"};
  border: 1.6px solid #a89168;
  border-radius: 1.7em;
  padding: 0.57em 1.23em;
  cursor: pointer;
  transition: background .13s, color .13s, box-shadow .15s;
  outline: none;
  box-shadow: ${({selected}) => selected ? "0 3px 12px #bdb57c33" : "none"};
  &:hover, &:focus {
    background: ${({selected}) =>
      selected ? "linear-gradient(90deg, #40652a 80%, #b0996c)" : "#e6ebd7"};
    color: ${({selected}) => selected ?  "#fff" : "#3e5321"};
  }
`;
const ActionButtons = styled.div`
  display: flex; gap: 1.1rem; margin-top: 1.7rem;
  justify-content: flex-end;
  @media (max-width: 650px) { flex-direction: column; gap: 0.7rem; }
`;
const BigButton = styled.button`
  font-size: 1.18rem; font-weight:700; letter-spacing: 0.01em;
  padding: 0.85em 2.2em;
  border: none; border-radius: 0.55em;
  background: ${({variant}) =>
    variant === "primary"
      ? "linear-gradient(90deg,#40652a,#a89168)"
      : "#fff"};
  color: ${({variant}) => variant === "primary" ? "#fffdf0" : "#40652a"};
  box-shadow: 0 1.5px 3px rgba(104,96,48,0.08);
  border: 1.6px solid #a89168;
  cursor: pointer;
  transition: background .13s, color .11s, box-shadow .13s;
  &:hover {
    background: ${({variant}) => variant === "primary"
      ? "linear-gradient(90deg,#4c7835 80%,#b5996c)"
      : "#e6ebd7"};
    color: ${({variant}) => variant === "primary" ? "#fff" : "#5d4517"};
    border-color: #b5996c;
  }
`;
const SuccessMsg = styled.div`
  font-size: 1.25rem;
  color: #40652a;
  background: #e0ead4;
  border-radius: 0.7rem;
  padding: 2.2rem 1rem;
  text-align: center;
  font-weight: 700;
  margin: 2em 0;
  letter-spacing: 0.01em;
`;

export default function Payment() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem('mehndi_cart') || '[]')
  );
  const [form, setForm] = useState({
    name: "", phone: "", address: "", pincode: "", email: ""
  });
  const [payMethod, setPayMethod] = useState("UPI");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds

  const nav = useNavigate();

  const total = cart.reduce((acc, p) => acc + p.qty * p.price, 0);

  // Timer logic
  useEffect(() => {
    if (!success) return;
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, [success, timer]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateQty(id, newQty) {
    setCart(cart => {
      const updated = cart.map(item =>
        item.id === id ? { ...item, qty: Math.max(newQty, 1) } : item
      );
      localStorage.setItem('mehndi_cart', JSON.stringify(updated));
      return updated;
    });
  }
  function removeItem(id) {
    setCart(cart => {
      const updated = cart.filter(item => item.id !== id);
      localStorage.setItem('mehndi_cart', JSON.stringify(updated));
      return updated;
    });
  }

  const handleChange = e => {
    setForm(f => ({...f, [e.target.name]: e.target.value}));
  };

  const handleConfirm = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!cart.length) return;
      await addDoc(collection(db, "orders"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        pincode: form.pincode,
        cart,
        total,
        paymentStatus: payMethod === "UPI" ? "Pending" : "Pending",
        paymentMethod: payMethod,
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      localStorage.removeItem('mehndi_cart');
      setCart([]);
      // No auto-redirect; user decides when done!
    } catch (e) {
      alert("Order could not be placed: " + (e?.message || e));
    }
    setLoading(false);
  };

  if (success) {
    return (
      <Page>
        <MainBox style={{ justifyContent: "center", alignItems: "center", minHeight: 420 }}>
          <SuccessMsg>
            <div style={{ color: "#40652a", fontWeight: "bold", fontSize: "1.25em", marginBottom: 6 }}>
              Step 2: Make Payment via UPI
            </div>
            {/* --- TIMER DISPLAY --- */}
            <div style={{
              fontSize: "1.17em",
              color: timer <= 60 ? "#bb2d2d" : "#40652a",
              fontWeight: 600,
              marginBottom: 15,
              letterSpacing: 1
            }}>
              Time left to pay: <span>{formatTime(timer)}</span>
            </div>
            <div style={{ margin: "1.3em 0" }}>
              <img
                src="/qr.jpg"
                alt="UPI QR"
                style={{ maxWidth: 260, width: "100%", borderRadius: 10, boxShadow: "0 2px 16px #8bb45622" }}
              />
            </div>
            <div style={{ fontSize: "1.14em", marginBottom: 10 }}>
              <strong>  :</strong>
              <span
                onClick={() => navigator.clipboard.writeText("7295077585@ptsbi")}
                style={{
                  userSelect: "all",
                  color: "#226944",
                  marginLeft: 6,
                  fontWeight: 600,
                  fontFamily: "monospace",
                  cursor: "pointer"
                }}
                title="Click to copy UPI ID"
              >
                7295077585@ptsbi
              </span>
              <span style={{
                marginLeft: 8,
                fontSize: "0.92em",
                color: "#b3992e"
              }}>(Click to copy)</span>
            </div>
            <div style={{ color: "#a59743", marginBottom: "0.5em" }}>
              Please scan the QR above or pay to the UPI ID.<br />
              After payment send your payment screenshot to our insta page/whatsapp number.<br />
              (We will verify and confirm your order soon!)
            </div>
            <button
              style={{
                marginTop: 18,
                background: "#40652a",
                color: "#fffef7",
                fontWeight: 700,
                fontSize: "1.04em",
                border: "none",
                borderRadius: 7,
                padding: "0.7em 1.7em",
                cursor: timer === 0 ? "not-allowed" : "pointer",
                opacity: timer === 0 ? 0.6 : 1
              }}
              disabled={timer === 0}
              onClick={() => { window.location.href = "/" }}
            >
              Done / Go Home
            </button>
            {timer === 0 && (
              <div style={{ color: "#bb2d2d", fontWeight: 700, marginTop: 24 }}>
                The payment window has expired. Please reload and try again.
              </div>
            )}
          </SuccessMsg>
        </MainBox>
      </Page>
    );
  }

  return (
    <Page>
      <MainBox>
        {/* --- ORDER SUMMARY --- */}
        <OrderCol>
          <Heading>Order Summary</Heading>
          <OrderTable>
            <TableHead>
              <div>Product</div>
              <div>Qty</div>
              <div>Price</div>
              <div></div>
            </TableHead>
            {cart.length === 0 ? (
              <Row>
                <div style={{color: "#99753c"}}>No items in cart.</div>
              </Row>
            ) : cart.map((item, idx) => (
              <Row key={item.id} last={idx === cart.length-1}>
                <div style={{maxWidth:140, fontWeight:500, color:"#334a19"}}>{item.name}</div>
                <div style={{display:'flex',alignItems:'center',gap:'0.3em'}}>
                  <button
                    style={qtyBtnStyle}
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1 || loading}
                    aria-label="Decrease quantity"
                  >–</button>
                  <span style={{minWidth:24, textAlign:'center'}}>{item.qty}</span>
                  <button
                    style={qtyBtnStyle}
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    disabled={loading}
                    aria-label="Increase quantity"
                  >+</button>
                </div>
                <div>₹{item.price * item.qty}</div>
                <button
                  onClick={() => removeItem(item.id)}
                  style={remBtnStyle}
                  aria-label="Remove item"
                  title="Remove item"
                  disabled={loading}
                >🗑️</button>
              </Row>
            ))}
            <TotalRow total>
              <div>Total</div>
              <div>₹{total}</div>
              <div></div>
              <div></div>
            </TotalRow>
          </OrderTable>
          <Note>All transactions are secure &amp; encrypted.</Note>
        </OrderCol>

        {/* --- CUSTOMER DETAILS FORM --- */}
        <FormCol>
          <Heading style={{marginBottom:"1.18em"}}>Delivery &amp; Payment</Heading>
          <FormBox autoComplete="off" onSubmit={handleConfirm}>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required value={form.name} onChange={handleChange} />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" required type="tel" pattern="[0-9]{10,}" placeholder="e.g. 9876543210" value={form.phone} onChange={handleChange} />
            </Field>
            <Field>
              <Label htmlFor="address">Delivery Address</Label>
              <Input id="address" name="address" required value={form.address} onChange={handleChange} />
            </Field>
            <Field style={{display:"flex", gap:"1.3em"}}>
              <div style={{flex:1}}>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" required pattern="[0-9]{6}" value={form.pincode} onChange={handleChange} style={{maxWidth:140}} />
              </div>
              <div style={{flex: 2}}>
                <Label htmlFor="email">Email ID</Label>
                <Input id="email" name="email" required type="email" value={form.email} onChange={handleChange} />
              </div>
            </Field>
            {/* --- PAYMENT METHOD --- */}
            <div>
              <Subheading>Payment Method</Subheading>
              <PaymentSection>
                <PaymentBtn
                  type="button"
                  selected={payMethod === "UPI"}
                  onClick={() => setPayMethod("UPI")}
                >
                  UPI
                </PaymentBtn>
              </PaymentSection>
            </div>
            {/* --- ACTION BUTTONS --- */}
            <ActionButtons>
              <BigButton
                variant="primary"
                type="submit"
                disabled={cart.length === 0 || loading}
                style={cart.length === 0 || loading
                  ? {opacity:0.6, cursor:"not-allowed"}
                  : undefined
                }
              >{loading ? "Processing..." : "Confirm Payment"}</BigButton>
              <BigButton type="button" variant="secondary" onClick={()=>nav("/")}>Cancel </BigButton>
            </ActionButtons>
          </FormBox>
        </FormCol>
      </MainBox>
    </Page>
  );
}
