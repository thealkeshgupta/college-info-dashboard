import { connect } from "react-redux";
import { setDashboardIndex } from "../../action/dashboard";
import { GithubOutlined,LinkedinFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Typography, Layout, Menu  } from 'antd';
const { Text } = Typography;
const { Header, Content, Footer } = Layout;


// Dashboard Component
const Dashboard = (props) => {

    return (
      <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal"selectedKeys={[props.index]} defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Home<Link to="/" /></Menu.Item>
          <Menu.Item key="2" >Colleges List<Link to="/collegeList" /></Menu.Item>
          <Menu.Item key="3">Check College Detail<Link to="/collegeDetails" /></Menu.Item>
          <Menu.Item key="4">State Comparison<Link to="/stateComparison" /></Menu.Item>
          <Menu.Item key="5">Course Comparison<Link to="/courseComparison" /></Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '5vh', paddingBottom: '5vh', marginTop: "20vh", marginLeft: "10vw", marginRight: "10vw", minHeight:'80vh', background: "#fff"}}>
        <div className="site-layout-background">

          {/* setting here the contents passed */}
          {props.content}
          
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}><Text keyboard style={{ fontSize: '18px' }}>Coded by Alkesh Gupta</Text><a href={"https://github.com/thealkeshgupta"}><GithubOutlined style={{ fontSize: '20px' }}/></a> <a href={"https://in.linkedin.com/in/alkesh-gupta"}><LinkedinFilled style={{ fontSize: '20px' }}/></a></Footer>
    </Layout>
      
    )
    };


// passing states as props to the component
    const mapStateToProps = (state) => {
      return {
        index: state.dashboard.index,
      };
    };
      
// connecting mapStateToProps and action to the component
    export default connect(mapStateToProps, {setDashboardIndex})(
      Dashboard
    );
      
    