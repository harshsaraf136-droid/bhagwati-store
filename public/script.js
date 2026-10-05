const products=[
{id:1,name:"Mustard Gold Designer Kurta",price:1299,img:"images/product-1.jpeg",size:"38"},
{id:2,name:"Light Green Cotton Kurta",price:1199,img:"images/product-2.jpeg",size:"Available sizes"},
{id:3,name:"Bright Yellow Cotton Kurta",price:1099,img:"images/product-3.jpeg",size:"42"}];
let cart=[];
function render(){document.getElementById("products").innerHTML=products.map(p=>`<article class="product"><div class="photo"><img src="${p.img}" alt="${p.name}"></div><div class="info"><span class="tag">GENTS</span><h3>${p.name}</h3><p class="size">Size: ${p.size}</p><b>₹${p.price.toLocaleString("en-IN")}</b><button class="btn primary add" onclick="addCart(${p.id})">Add to Cart</button></div></article>`).join("")}
function addCart(id){const p=products.find(x=>x.id===id),i=cart.find(x=>x.id===id);i?i.qty++:cart.push({...p,qty:1});update();openCart()}
function update(){document.getElementById("count").textContent=cart.reduce((a,b)=>a+b.qty,0);document.getElementById("items").innerHTML=cart.length?cart.map(p=>`<div class="cartRow"><span>${p.name} × ${p.qty}</span><b>₹${(p.price*p.qty).toLocaleString("en-IN")}</b></div>`).join(""):"<p>Your cart is empty.</p>";document.getElementById("total").textContent="₹"+cart.reduce((a,b)=>a+b.price*b.qty,0).toLocaleString("en-IN")}
function openCart(){document.getElementById("cartModal").classList.remove("hidden");update()} function closeCart(){document.getElementById("cartModal").classList.add("hidden")}
function checkout(){if(!cart.length)return alert("Please add a product first.");closeCart();document.getElementById("checkoutModal").classList.remove("hidden")}
function closeCheckout(){document.getElementById("checkoutModal").classList.add("hidden")}
function customer(){return {name:document.getElementById("name").value.trim(),phone:document.getElementById("phone").value.trim(),address:document.getElementById("address").value.trim()}}
async function payOnline(){
 const c=customer(); if(!c.name||!c.phone||!c.address)return alert("Please fill in your name, mobile and address.");
 const r=await fetch("/api?action=create-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:cart,customer:c})});
 const data=await r.json(); if(!r.ok)return alert(data.error||"Could not start payment.");
 const options={key:data.keyId,amount:data.amount,currency:data.currency,name:"Bhagwati Store",description:"Kurta Pajama Order",order_id:data.orderId,prefill:{name:c.name,contact:c.phone},theme:{color:"#a56c28"},
 handler:async function(resp){
   const v=await fetch("/api?action=verify-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(resp)});
   const result=await v.json();
   if(result.success){alert("Payment successful! Order receipt: "+result.receipt);cart=[];update();closeCheckout()}else alert("Payment verification failed. Please contact Bhagwati Store.");
 }};
 const rp=new Razorpay(options); rp.on("payment.failed",x=>alert("Payment failed: "+(x.error?.description||"Please try again."))); rp.open();
}
async function placeCOD(){
 const c=customer(); if(!c.name||!c.phone||!c.address)return alert("Please fill in your name, mobile and address.");
 const r=await fetch("/api?action=cod-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:cart,customer:c})});
 const data=await r.json(); if(!r.ok)return alert(data.error||"Could not create order.");
 alert("COD order placed! Receipt: "+data.receipt+"\\nWe will contact you on WhatsApp: +91 9919923418");cart=[];update();closeCheckout();
}
render();