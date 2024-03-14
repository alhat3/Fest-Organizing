
//     <form action="/api/v1/order/<%=events%>/payment" method="post" id=""
//             class=" pl-8 pr-16  w-[50%] h-full grid grid-cols-2 grid-rows-5 hidden ">
//             <div class=" col-span-2 flex  items-center">
//                 <h1 class="text-3xl chek font-semibold">Payment Details</h1>
//             </div>
//             <div class=" col-span-2 flex flex-col justify-center ">
//                 <label for="cardholder_name" class="w-fit">Name on Card</label>
//                 <input type="text" name="cardholder_name" maxlength="24" class="uppercase" id="cardholder_name">
//             </div>
//             <div class=" col-span-2 flex flex-col justify-center ">
//                 <label for="card_number" class="w-fit">Card Number</label>
//                 <input type="number" name="card_number" id="card_number">
//             </div>
//             <div class=" mr-auto w-[90%] flex flex-col justify-center">
//                 <label for="expiry_month" class="w-fit">Valid Through</label>
//                 <div class="w-[100%] flex border-b-2 border-gray-500  focus:border-blue">
//                     <input type="number" name="expiry_month" id="expiry_month"
//                         class="focus:border-none focus:outline-none pb-3"><span class="text-gray-600 text-3xl ">/</span>
//                     <input type="number" name="expiry_year" id="expiry_year"
//                         class="focus:border-none focus:outline-none pb-3">
//                 </div>
//             </div>
//             <div class=" ml-auto w-[90%] flex flex-col justify-center ">
//                 <label for="cvv" class="w-fit">CVV</label>
//                 <input type="number" name="cvc" id="cvv">
//             </div>
//             <div class=" col-span-2 flex justify-center items-center" id="paymentDiv">
//                 <button type="submit" id="payBtn"> PAY ₹10000.00</button>
//             </div>
//         </form>
    
//     /* <form action="/api/v1/order/<%=events%>/payment" method="post" id=""
//     class=" pl-8 pr-16  w-[50%] h-full grid grid-cols-2 grid-rows-5 hidden ">
//     <div class=" col-span-2 flex  items-center">
//         <h1 class="text-3xl chek font-semibold">Payment Details</h1>
//     </div>
//     <div class=" col-span-2 flex flex-col justify-center ">
//         <label for="cardholder_name" class="w-fit">Name on Card</label>
//         <input type="text" name="cardholder_name" maxlength="24" class="uppercase" id="cardholder_name">
//     </div>
//     <div class=" col-span-2 flex flex-col justify-center ">
//         <label for="card_number" class="w-fit">Card Number</label>
//         <input type="number" name="card_number" id="card_number">
//     </div>
//     <div class=" mr-auto w-[90%] flex flex-col justify-center">
//         <label for="expiry_month" class="w-fit">Valid Through</label>
//         <div class="w-[100%] flex border-b-2 border-gray-500  focus:border-blue">
//             <input type="number" name="expiry_month" id="expiry_month"
//                 class="focus:border-none focus:outline-none pb-3"><span class="text-gray-600 text-3xl ">/</span>
//                 <input type="number" name="expiry_year" id="expiry_year"
//                     class="focus:border-none focus:outline-none pb-3">
//                 </div>
//         </div>
//         <div class=" ml-auto w-[90%] flex flex-col justify-center ">
//             <label for="cvv" class="w-fit">CVV</label>
//             <input type="number" name="cvc" id="cvv">
//         </div>
//         <div class=" col-span-2 flex justify-center items-center" id="paymentDiv">
//             <button type="submit" id="payBtn"> PAY ₹10000.00</button>
//         </div>
// </form>; 