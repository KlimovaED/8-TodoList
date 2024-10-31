describe('task',()=>{
  it('base example, visually looks correct', async ()=>{
    await  page.goto('http://localhost:9009/iframe.html?id=todolists-task--task-story&viewMode=story',{
      waitUntil:'networkidle2'
    })
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  })
})
