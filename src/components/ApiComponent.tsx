import { useSpring, useSpringRef, animated } from '@react-spring/web'

const ApiComponent = () => {
  const api = useSpringRef()
  const springs = useSpring({
    ref: api,
    from: { x: 0, rotateY: 0},
  })

  const handleClick = () => {
    api.start({
      to: {
        x: springs.x.get() === 100 ? 0 : 100,
        rotateY: springs.rotateY.get() === 180 ? 0 : 180,
      },
    })
  }

  return (
    <div className="flex-container">
      <animated.div
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          background: '#ff6d6d',
          borderRadius: 8,
          ...springs,
        }}
      />
      <span>Render ID – {Math.random()}</span>
    </div>
  )
}

export default ApiComponent;