class OpenRedUI{
  constructor(pageContext, app){
    this.page = pageContext;
    this.page.closeBtn = this.closeBtn.bind(this);
    this.page.setData({
      BoxConfig:{
        redpacketAmount:1.22,
        curAmount: 10,
        targetAmount: 30
      },
      redpacketColse:0
    })
    console.log(pageContext);
  }

  closeBtn(){
    this.page.setData({
      redpacketColse: 1
    })
  }

}


export default OpenRedUI;