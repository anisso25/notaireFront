import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Col,
} from 'antd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 25px;
  box-shadow: 0 0 11px rgba(33,33,33,.2);
  transition: box-shadow .3s;
  height: 200px;
  border-radius:8px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

`;
const DocIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
`;

const DocName = styled.div`
  color: black;
  font-size: 30px;
  text-shadow: 0px 1px 1px #000000;
  text-align: center;
`;

const DocType = ({
  name,
  icon,
  id,
}) => (
  <Col
    xs={24}
    sm={24}
    md={12}
    lg={8}
    xl={7}
  >
    <Link to={`/document/${id}`}>
      <Container>
        <DocIcon src={icon} alt={name} />
        <DocName>{ name }</DocName>
      </Container>
    </Link>
  </Col>
);

DocType.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default DocType;
