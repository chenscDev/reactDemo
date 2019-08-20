import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getEntityMenu } from '../../api/public'
import { Menu, Layout, Input, Avatar, Badge, Dropdown, Icon } from 'antd';
import _ from 'lodash';
import './header.css'
const { Header } = Layout;
const { Search } = Input;

const { SubMenu } = Menu;

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: [],
      menuSlice: [],
      menuMore: []
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  componentDidMount() {
    this.getEntityMenu()
  }

  async getEntityMenu() {
    try {
      const menu = await getEntityMenu();
      const menuSlice = menu.slice(0,4)
      const menuMore = menu.slice(4)
      this.setState({ menu, menuSlice, menuMore })
    } catch (error) {
      console.log(error)
    }
  }

  renderMenuItem(menu) {
    return menu.map((item, index) => {
      const menuChild = item.children;
      if (_.isEmpty(menuChild)) {
        const link = item.parameter.moduleInfoId ? `/module/${item.parameter.moduleInfoId}` : item.parameter.path
      return <Menu.Item key={item.id}><Link to={link}>{item.name}</Link></Menu.Item>;
      }
      return (
        <SubMenu
          key={index}
          title={
            <span className="submenu-title-wrapper">
              {item.name}
            </span>
          }
          onOpenChange={(key) => {
            
          }}
        >
          <Menu.ItemGroup>
            {this.renderMenuList(menuChild)}
          </Menu.ItemGroup>
        </SubMenu>
      );
    });
  }

  renderMenuList(child) {
    if (_.isEmpty(child)) {
      return null;
    }
    return child.map(item => {
      const link = item.parameter.moduleInfoId ? `/module/${item.parameter.moduleInfoId}` : item.parameter.path
      return <Menu.Item key={item.id}><Link to={link}>{item.name}</Link></Menu.Item>;
    });
  }

  renderTools() {
    return (
      <div className='toolWrap' style={{float: 'right', }}>
        <div style={{float: "left", marginTop: '15px'}}>
          <Search
            style={{float: "left"}}
            placeholder="请输入搜索关键字"
            onSearch={value => console.log(value)}
          />
        </div>
        <div style={{float: "left", marginLeft: '10px'}}>
          <Badge count={10} style={{float: "left", marginLeft: '30px'}}>
            <Icon style={{ fontSize: '25px'}} type="bell" />
          </Badge>
          <Icon type="appstore" style={{ marginLeft: '30px', fontSize: '25px'}} />
          <Icon type="setting" style={{ marginLeft: '30px', fontSize: '25px'}} />
        </div>
      </div>
    );
  }

  render() {
    const { menuSlice, menuMore } = this.state;
    return (
      <Layout>
        <Header style={{backgroundColor: '#363b52', padding: '0 30px'}}>
          <div className="logo">
            <Avatar size="large" icon="user" />
          </div>
          {this.renderTools()}
          <Menu 
            onClick={this.handleClick} 
            defaultSelectedKeys={['home']}
            mode="horizontal"
            style={{ lineHeight: '64px', backgroundColor: '#363b52', color: '#fff' }}
            >
            <Menu.Item key={'home'}><Link to={'/'}>首页</Link></Menu.Item>
            {this.renderMenuItem(menuSlice)}
            <Dropdown trigger={['click']} overlay={<Menu>{this.renderMenuItem(menuMore)}</Menu>}>
              <Icon type="ellipsis" style={{ fontSize: '30px'}} />
            </Dropdown>
          </Menu>
        </Header>
        {this.props.children}
      </Layout>
    );
  }
}

export default withRouter(HeaderMenu)
