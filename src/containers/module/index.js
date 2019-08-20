import React from 'react';
// import { withRouter } from 'react-router-dom';
import HeaderMenu from '../../components/header';
import { getEntityListCount, getEntityListType } from '../../api/module'
// import { Menu, Layout, Input, Avatar, Badge, Dropdown, Icon } from 'antd';
// import _ from 'lodash';
// import './header.css'
// const { Header } = Layout;
// const { Search } = Input;

// const { SubMenu } = Menu;

class ModuleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
    this.getEntityListCount()
  }

  async getEntityListCount() {
    try {
      const apiName = this.props.match.params.apiName;
      const type = await getEntityListType({apiName});
      const viewList = type.viewList.map(item => item.value);
      const count = await getEntityListCount({
        data: {
          describeApiName: apiName,
          viewCodes: viewList
        }
      });
      console.log(count)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <HeaderMenu>
        哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或
      </HeaderMenu>
    );
  }
}

export default (props) => <ModuleComponent {...props} key={props.location.pathname} />
// export default ModuleComponent;

