
const Error = () => {
    return(
        <div className="error"  style={{display:"flex",justifyContent:"center",alignItems:"center",}}>
            <div  style={{display:"flex",flexDirection:"column",marginTop:'100px'}} >
                <img src="./images/langlog logo.png" alt="logo"/>
                <div style={{color:' #000',
                            fontFamily: 'Lora',
                            marginLeft:'70px',
                            marginTop:'20px',
                            fontSize: '55px',
                            fontStyle: 'italic',
                            fontWeight: '200',}}>ERROR <span style={{color:'#739072'}}>404</span></div>
            </div>
            
        </div>
    );
}

export default Error;