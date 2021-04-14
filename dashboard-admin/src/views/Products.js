import React, { useEffect } from "react";
import {productService} from '../_services/product_services';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const loaderClass = {
  position: 'fixed',
  background: '#fff',
  width: '100%',
  zIndex: '11111',
  top: '0',
  height: '100%',
  textAlign: 'center',
};

function Typography() {
  const [products, setProducts] = React.useState([]);
  const [ spinner, setSpinner ] = React.useState(true);
  
  useEffect(() => {       
    productService.getAllProducts().then(
      data => {        
        setProducts(data.data);   
        setSpinner(false);     
      },
      err => {
        console.log('yalhwy')
      }
    )
  })

  return (
    <>
    {spinner ? <div style={loaderClass}>
      <img src={require("assets/img/loading.gif").default} />
    </div>
 : ''}
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
            <Button className="btn float-right btn-sm btn-outline-info">Add new <i className="fas fa-plus"></i></Button>
              <Card.Title as="h4">Products Details</Card.Title>
              {/* <p className="card-category">
                Here is a subtitle for this table
              </p> */}
              
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Image</th>
                    <th className="border-0">Price</th>
                    <th className="border-0">Brand</th>
                  </tr>
                </thead> 
                <tbody>
                  {products.map((product,index) => <tr key={index}>
                     <td>{index+1}</td>
                    <td>{product.nameEn}</td>                    
                    <td><img
                src={require("assets/img/products/sample.png").default}
                alt="..." style={{width:'100px'}}
              /></td>
                    <td>{ product.price }</td>
                    <td>{product.brand}</td>                    
                  </tr>)}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      
      </Row>
    </Container>
  </>
  
  );
}

export default Typography;
