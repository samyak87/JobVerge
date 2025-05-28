export function testController(req, res) {
  res.status(200).json({ message: 'Test route is working!' });
  console.log('Test route is working!');
}

export function testController2(req, res) {     
  res.status(200).json({ message: 'Post test route is working!' });
  console.log('Post test route is working!');
}