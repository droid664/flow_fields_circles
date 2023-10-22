import p5, { Color } from 'p5'
import './style.css'

const FLOW_COUNT = 20
const SIZE = 50
let speed_x = 0.3
let speed_y = 1
let color = 0
let fields = []

const sketch = (p) => {
	p.setup = () => {
		p.noStroke()
		p.createCanvas(p.windowWidth, p.windowHeight)
		p.colorMode(p.HSB)
		p.background(0)

		for (let i = 0; i < FLOW_COUNT; i++) {
			p.fill(color, 100, 100)
			let startX = p.random(-SIZE, p.windowWidth)
			let startY = p.random(p.windowHeight / 2, p.windowHeight)
			p.ellipse(startX, startY, SIZE)
			fields.push({
				startX: startX,
				startY: startY,
				x: startX,
				y: startY,
				speedX: speed_x * (p.random(-1, 1) > 0 ? 1 : -1),
			})
		}
	}
	p.draw = () => {
		for (let i = 0; i < FLOW_COUNT; i++) {
			p.fill(color, 100, 70)
			p.ellipse(fields[i].x, fields[i].y, SIZE)

			fields[i].y -= speed_y
			fields[i].x += fields[i].speedX * Math.cos(p.frameCount * 0.02)

			if (fields[i].y < -SIZE) {
				fields[i].y = p.windowHeight + SIZE
				fields[i].x = p.random(-SIZE, p.windowWidth)
			}
		}

		if (p.frameCount % 100 === 0) {
			speed_y = p.random(0.5, 2)
		}

		color += 0.2
		color %= 360
	}
	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight)
		p.background(0)
	}
}

new p5(sketch)
