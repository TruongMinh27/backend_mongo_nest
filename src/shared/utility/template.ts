export const template = (text: string) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
   <div style="margin:50px auto;width:70%;padding:20px 0">
     <div style="border-bottom:1px solid #eee">
       <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">E-Commerce Web by Minh</a>
     </div>
     <p style="font-size:1.1em">Hi,</p>
     ${text}
     
     <p style="font-size:0.9em;">Trân Trọng !<br />Nguyễn Cao Trường Minh</p>
     <hr style="border:none;border-top:1px solid #eee" />
     <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
       <p>Ecommerce Full Stack</p>
       <p>736 Nguyễn Trãi</p>
       <p>Việt Nam</p>
     </div>
   </div>
  </div>`;
};
