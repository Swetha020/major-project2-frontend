import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="d-flex  align-items-center  header">
        <img src={logo} alt="App Logo" style={{height:"100px"}}/>
      <h1 className="anvaya">Anvaya CRM</h1>
    </div>
  );
}