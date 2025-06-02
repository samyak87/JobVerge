export function testController(req, res) {
  res.status(200).json({ message: 'Test route is working!' });
  console.log('Test route is working!');
}

export function testController2(req, res) {     
  const { name } = req.body;
  res.status(200).send(`Your Name Is ${name}`);
  console.log('Post test route is working!');
}