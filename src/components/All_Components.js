// // import React from 'react';
// // import { Button, Card, Flex, Typography } from 'antd';
// // const cardStyle = {
// //   width: 620,
// // };
// // const imgStyle = {
// //   display: 'block',
// //   width: 310,
// // };
// // const App = () => (
// //   <Card
// //     hoverable
// //     style={cardStyle}
// //     styles={{
// //       body: {
// //         padding: 0,
// //         overflow: 'hidden',
// //       },
// //     }}
// //   >
// //     <Flex justify="space-between">
// //       <img
// //         alt="avatar"
// //         src="https://images.unsplash.com/photo-1713707131882-5086e8fd53b8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds"
// //         style={imgStyle}
// //       />
// //       <Flex
// //         vertical
// //         align="flex-end"
// //         justify="space-around"
// //         style={{
// //           padding: 32,
// //         }}
// //       >
// //           <h4>Sahil Navlakha.!</h4>
// //           <small>CEO</small>
// //         <Button type="primary" href="https://www.google.com" target="_blank">
// //           About Me
// //         </Button>
// //       </Flex>
// //     </Flex>
// //   </Card>
// // );
// // export default App;

// import React from 'react';
// import { Button, Dropdown, Space } from 'antd';
// const items = [
//   {
//     key: '1',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//         1st
//       </a>
//     ),
//   },
//   {
//     key: '2',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//         2nd 
//       </a>
//     ),
//   },
//   {
//     key: '3',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
//         3rd 
//       </a>
//     ),
//   },

//   {
//       key:'4',
//       label:(
//         <a href="http://www.google.com" >Google</a>
//       )
      
//   },
//   {
//       key:'5',
//       label:(
//         <a href="http://www.youtube.com">Youtube</a>
//       )
//   },
//   {
//       key :'6',
//       label:(
//         <a href="https://www.w3schools.com/quiztest/quiztest.asp?qtest=HTML">Sahil</a>
//       )
//   }
// ];
// const App = () => (
//   <Space direction="vertical " style={{marginTop:'300px'}}>
//     <Space wrap>
//       <Dropdown
//         menu={{
//           items,
//         }}
//         placement="bottom-left"
//       >
//         <Button>Click Here</Button>
//       </Dropdown>
//       <Dropdown
//         menu={{
//           items,
//         }}
//         placement="bottom"
//       >
//         <Button>bottom</Button>
//       </Dropdown>
//       <Dropdown
//         menu={{
//           items,
//         }}
//         placement="bottomRight"
//       >
//         <Button>bottomRight</Button>
//       </Dropdown>
//     </Space>
//     <Space wrap>
//       <Dropdown
//         menu={{
//           items,
//         }}
//         placement="topLeft"
//       >
//         <Button>topLeft</Button>
//       </Dropdown>
//       <Dropdown
//         menu={{
//           items,
//         }}
//         placement="top"
//       >
//         <Button>top</Button>
//       </Dropdown>
//       <Dropdown
//         menu={{
//           items,
//         }}
//         placement="topRight"
//       >
//         <Button>topRight</Button>
//       </Dropdown>
//     </Space>
//   </Space>
// );
// export default App;