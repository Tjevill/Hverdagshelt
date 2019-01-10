
// trying to import htmlsig.html into emailsignature, with document.write() not complete

let html = (
  <div style="text-size-adjust: none !important; -ms-text-size-adjust: none !important; -webkit-text-size-adjust: none !important;"> 
    <span style="margin: 0px; padding: 0px; line-height: 100%; display: block; font-family: Helvetica, Arial, sans-serif;" /> 

    <span style="margin:0; padding:0; font-family: Helvetica, Arial, sans-serif; font-size: 10px; line-height: 12px; color: #212121; display:block;"> 
      <span style="font-weight: bold; color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif; display: inline;"> 
        HverdagsHelt Support Team 
      </span>
      <span style="color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif;" />
      <span style="display: inline; font-family: Helvetica, Arial, sans-serif;">
        <br />
      </span>
      <a
        href="mailto:bedrehverdagshelt@gmail.com"
        style="color: rgb(71, 124, 204); text-decoration: none; display: inline;"
      >
        bedrehverdagshelt@gmail.com
      </a>
      <span style="color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif;" />
    </span>

    <span style="margin: 0px; padding: 0px; font-family: Helvetica, Arial, sans-serif; font-size: 10px; line-height: 12px; display: block;">
      <span style="font-weight: bold; color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif; display: inline;">
        HverdagsHelt AS
      </span>
      <span style="display: inline; font-family: Helvetica, Arial, sans-serif;">
        <br />
      </span>
      <span style="color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif; display: inline;">
        +47 72 59 50 00
      </span>
      <span style="color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif;" />
      <span style="display: inline; font-family: Helvetica, Arial, sans-serif;">
        <br />
      </span>
      <span style="color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif; display: inline;">
        Sverres Gate 10, 7012 Trondheim
      </span>
      <span style="font-family: Helvetica, Arial, sans-serif; display: inline;">
        <br />
      </span>
      <span style="color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif;" />
      <span style="display: block; font-family: Helvetica, Arial, sans-serif;" />

      <span style="display: block; color: rgb(33, 33, 33); font-family: Helvetica, Arial, sans-serif;">
        <a href="http://www.hverdagshelt.no" style="color: rgb(71, 124, 204); text-decoration: none; display: inline;">
          www.hverdagshelt.no
        </a>
      </span>
    </span>
  </div>
);


document.write(html);