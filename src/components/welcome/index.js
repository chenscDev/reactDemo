import React from 'react';
import { getUserInfo, getDefaultPage } from '../../api/public'
import { Layout, Select } from 'antd';
import '../../index.css'
const { Header } = Layout;
const { Option } = Select;


export default class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      searchPage: [],
      defaultSearch: ''
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  async getUserInfo() {
    try {
      const user = getUserInfo();
      const defaultPage = getDefaultPage();
      const result = await Promise.all([user, defaultPage]);
      const [name, page] = result;
      const userName = name[0].firstName;
      const searchPage = page;
      const defaultSearch = searchPage[0].label;
      this.setState({ userName, searchPage, defaultSearch })
    } catch (error) {
      // console.log(error)
    }
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  renderSearch() {
    const { defaultSearch } = this.state;
    if (defaultSearch) {
      return (
        <Select 
          defaultValue={defaultSearch} 
          style={{ width: 200 }} 
          onChange={this.handleChange}
          dropdownStyle={{backgroundColor: 'red'}}
        >
          {this.renderDefaultPage()}
        </Select>
      )
    }
  }

  renderDefaultPage() {
    const { searchPage } = this.state;
    return searchPage.map((item, index) => {
      return <Option key={index} value={item.label}>{item.label}</Option>
    })
  }

  render() {
    return (
      <Layout>
        <Header style={style.header}>
          <div className='left'>
            <span>欢迎你，</span>
            <span>{this.state.userName}</span>
          </div>
          <div className='right'>
            {this.renderSearch()}
          </div>
        </Header> 
      </Layout>
    );
  }
}

const style = {
  header: {
    height: '50px', 
    lineHeight: '50px',
    padding: '0 30px',
    backgroundColor: '#fff', 
    boxShadow: '0 2px 2px #EAEAEA'
  }
}
