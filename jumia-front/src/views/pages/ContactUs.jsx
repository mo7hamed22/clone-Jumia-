import React, { lazy, Component } from "react";
import { ReactComponent as IconEnvelopeFill } from "bootstrap-icons/icons/envelope-fill.svg";
import { ReactComponent as IconHouseFill } from "bootstrap-icons/icons/house-fill.svg";
import { homeServices } from "../../services/_home";
import { ReactComponent as IconTelephoneFill } from "bootstrap-icons/icons/telephone-fill.svg";
import contactTop from "../../assets/contact-top.jpg";
const ContactUsForm = lazy(() => import("../../components/ContactUsForm"));



class ContactUsView extends Component {
  onSubmit = async (values) => {    
    window.location.href = `mailto:moa.mahfouz@gmail.com?cc=someoneelse@theirsite.com&subject=My order is ${values.company}&body=Hi, my name is ${values.name} I am sending this emial because of ${values.message}`;    
    this.setState({sending: true});
  };

  state = {
    contacts: [],
    sending: false,
  }

  componentDidMount() {    
    homeServices.getSiteSettings().then(
      (data) => {
        this.setState({ contacts: data.data.contact });               
      },
      (err) => {
        console.log(err);
      }
    );
  }


  render() {
    const isLoggedIn = this.state.sending;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12">
            <img src={contactTop} className="img-fluid"/>
          </div>
          <div className="col-md-12 mt-2 mb-2">
            <div className="alert alert-danger text-center">
            For your payment security DO NOT share your card details with anyone. For confirmation purposes, only the first 6 numbers and last 4 numbers of the card can be shared. NEVER share your expiry or CVV number as per the picture below.
            </div>
          </div>

          <div className="col-md-12 text-center text-warning p-3">
            <h1>Need help placing an order?</h1>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body text-center">
              If you have trouble placing your order, please call us on the following number:
              <br/>
          <b>
              15204
          <br />
              Opening hours: Sunday to Thursday 11:00 a.m. to 5:00 p.m.</b>
              </div>
            </div>
          </div>

        </div>
        <div className="row g-3 mt-2">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-warning">
                <IconEnvelopeFill className="i-va" /> Send Message
              </div>
              <div className="card-body">
                
              {isLoggedIn ? (
              <div className="card p-3">
                <div className="alert alert-success">
                  Your mailbox will be opend right now. We will help you as soon as possible.
                </div>
              </div>
            ) : (
              <ContactUsForm isLoggedIn={false} onSubmit={this.onSubmit} />
            )}
                
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-header bg-warning">
                 Contact info
              </div>
              <div className="card-body">                
                <address>
                  <i className="fa fa-envelope"/> {this.state.contacts.email}
                  <br />
                  <i className="fa fa-fax"/> {this.state.contacts.fax}
                  <br />
                  <i className="fa fa-phone"/> {this.state.contacts.phone}
                  <br />                  
                </address>               
              </div>
            </div>
            <div className="card">
              <div className="google-maps">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d313635.5491853188!2d-122.57606416467848!3d37.20933611930123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815c67b3754d%3A0xb42714f3436732f2!2s1355%20Market%20St%20%23900%2C%20San%20Francisco%2C%20CA%2094103%2C%20USA!5e0!3m2!1sen!2sin!4v1599193189366!5m2!1sen!2sin"
                  width={400}
                  height={300}
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                  title="Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUsView;
