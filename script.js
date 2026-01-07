// Sound Management
let soundEnabled = true
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

function playSound(frequency = 440, duration = 0.1, type = "sine") {
  if (!soundEnabled) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = type

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

// Sound Toggle
const soundToggle = document.getElementById("soundToggle")
if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled
    soundToggle.textContent = soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"
  })
}

// Navigation
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })
}

// Close menu when clicking a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Light Candles
const candleButtons = document.querySelectorAll(".candle")
const lightCandlesBtn = document.getElementById("lightCandlesBtn")

if (lightCandlesBtn) {
  lightCandlesBtn.addEventListener("click", () => {
    candleButtons.forEach((candle, index) => {
      setTimeout(() => {
        const flame = candle.querySelector(".flame")
        flame.classList.remove("unlit")
        playSound(880 + index * 100, 0.15, "sine")
      }, index * 100)
    })
  })
}

// Candle Click to Extinguish
candleButtons.forEach((candle) => {
  candle.addEventListener("click", (e) => {
    e.stopPropagation()
    const flame = candle.querySelector(".flame")
    flame.classList.toggle("unlit")
    playSound(440, 0.1)
  })
})

// Pop Balloons
const popBalloonsBtn = document.getElementById("popBalloonsBtn")
const balloons = document.querySelectorAll(".balloon")

if (popBalloonsBtn) {
  popBalloonsBtn.addEventListener("click", () => {
    balloons.forEach((balloon, index) => {
      setTimeout(() => {
        balloon.classList.add("popped")
        playSound(600 + Math.random() * 200, 0.1)
        createConfetti(50)
        setTimeout(() => {
          balloon.classList.remove("popped")
        }, 500)
      }, index * 100)
    })
  })
}

// Confetti Cannon
function createConfetti(count = 100) {
  const confettiContainer = document.getElementById("confetti") || document.body
  const colors = ["#ff6b6b", "#ffa751", "#feca57", "#48dbfb", "#667eea", "#f093fb", "#43e97b"]

  for (let i = 0; i < count; i++) {
    const confettiPiece = document.createElement("div")
    confettiPiece.className = "confetti-piece"
    confettiPiece.style.left = Math.random() * window.innerWidth + "px"
    confettiPiece.style.top = Math.random() * window.innerHeight + "px"
    confettiPiece.style.background = colors[Math.floor(Math.random() * colors.length)]
    confettiPiece.style.opacity = Math.random()

    confettiContainer.appendChild(confettiPiece)

    // Animate
    let x = (Math.random() - 0.5) * 400
    let y = (Math.random() - 0.5) * 400
    let rotation = Math.random() * 360

    const animate = () => {
      x += (Math.random() - 0.5) * 10
      y += Math.random() * 5 + 2
      rotation += 10

      confettiPiece.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`
      confettiPiece.style.opacity -= 0.01

      if (confettiPiece.style.opacity > 0) {
        requestAnimationFrame(animate)
      } else {
        confettiPiece.remove()
      }
    }

    animate()
  }
}

const confettiBtn = document.getElementById("confettiBtn")
if (confettiBtn) {
  confettiBtn.addEventListener("click", () => {
    createConfetti(150)
    playSound(800, 0.2)
  })
}

// Fireworks
const fireworksBtn = document.getElementById("fireworksBtn")
if (fireworksBtn) {
  fireworksBtn.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createConfetti(80)
        playSound(600 + i * 100, 0.15)
      }, i * 200)
    }
  })
}

// Spin the Wheel
const spinBtn = document.getElementById("spinBtn")
const wheel = document.getElementById("wheel")
const spinResult = document.getElementById("spinResult")
const wheelMessages = [
  "🎁 Jackpot! Ultimate Luck!",
  "🎉 Amazing! Super Fun Ahead!",
  "✨ Great! Something Special!",
  "🌟 Awesome! Pure Joy!",
  "🎊 Fantastic! Double Happiness!",
  "🎈 Wonderful! Keep Smiling!",
  "🏆 Champion! You Win!",
  "💝 Beautiful! Love Everywhere!",
]

if (spinBtn) {
  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true
    const randomDegree = Math.floor(Math.random() * 360) + 3600
    wheel.style.transform = `rotate(${randomDegree}deg)`
    playSound(800, 0.1)

    setTimeout(() => {
      const messageIndex = Math.floor((randomDegree % 360) / 45)
      spinResult.textContent = wheelMessages[messageIndex]
      spinBtn.disabled = false
      playSound(600, 0.2)
    }, 3000)
  })
}

// Lucky Dip
const dipBoxes = document.querySelectorAll(".dip-box")
const dipResult = document.getElementById("dipResult")
const dipPrizes = [
  "🎁 You won a surprise!",
  "🌟 Extra happiness unlocked!",
  "🏆 Champion of the day!",
  "💎 You are precious!",
  "🎊 Double celebration!",
  "✨ Magic moment activated!",
]

dipBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (!box.classList.contains("revealed")) {
      box.classList.add("revealed")
      dipResult.textContent = dipPrizes[index]
      playSound(700, 0.2)
    }
  })
})

// Fun Facts
const facts = [
  "🎂 The first birthday cake was made by ancient Egyptians for the pharaohs!",
  "🎈 Balloons were first invented in 1824 using animal bladders!",
  '🎉 The word "party" comes from the Latin "partiri" meaning "to divide"',
  "🎊 Confetti was originally made from flower petals!",
  "🕯️ Birthday candles were used to celebrate the moon goddess in ancient Greece!",
  "🎁 Gift-giving on birthdays dates back to ancient Persia!",
  "🌟 The first birthday card was sent in 1851!",
  '🎶 "Happy Birthday" was copyrighted until 2016!',
  "🎯 Blowing out candles represents releasing your wish into the universe!",
  "💫 Birthday parties increase happiness by 300%!",
]

const factBtn = document.getElementById("factBtn")
const factBox = document.getElementById("factBox")

if (factBtn) {
  factBtn.addEventListener("click", () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)]
    factBox.textContent = randomFact
    playSound(659, 0.15)
  })
}

// Memory Match Game
const memoryGrid = document.getElementById("memoryGrid")
const memoryResult = document.getElementById("memoryResult")

if (memoryGrid) {
  const emojis = ["🎂", "🎈", "🎁", "🎉", "🎊", "✨"]
  const gameCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
  let flipped = []
  let matched = 0

  gameCards.forEach((emoji, index) => {
    const card = document.createElement("div")
    card.className = "memory-card-item"
    card.dataset.emoji = emoji
    card.dataset.index = index
    card.textContent = "?"

    card.addEventListener("click", () => {
      if (flipped.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
        card.classList.add("flipped")
        card.textContent = emoji
        flipped.push(card)
        playSound(659, 0.1)

        if (flipped.length === 2) {
          const [card1, card2] = flipped
          if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add("matched")
            card2.classList.add("matched")
            matched += 2
            flipped = []
            playSound(800, 0.2)

            if (matched === gameCards.length) {
              memoryResult.textContent = "🎉 You won! Amazing memory!"
            }
          } else {
            setTimeout(() => {
              card1.classList.remove("flipped")
              card2.classList.remove("flipped")
              card1.textContent = "?"
              card2.textContent = "?"
              flipped = []
            }, 1000)
          }
        }
      }
    })

    memoryGrid.appendChild(card)
  })
}

// Message Form
const messageForm = document.getElementById("messageForm")
const messagesContainer = document.getElementById("messagesContainer")

if (messageForm) {
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const message = document.getElementById("message").value

    if (name && message) {
      const messageItem = document.createElement("div")
      messageItem.className = "message-item"
      messageItem.innerHTML = `
                <div class="message-header">
                    <strong>${name}</strong>
                    <span class="message-icon">💌</span>
                </div>
                <p>${message}</p>
            `

      messagesContainer.insertBefore(messageItem, messagesContainer.firstChild)
      messageForm.reset()
      playSound(700, 0.15)
      createConfetti(50)
    }
  })
}

// Music Player
const songs = [
  {
    title: "Happy Birthday (Classic)",
    artist: "Traditional",
    frequencies: [262, 262, 294, 262, 349, 330], // Simplified Happy Birthday melody
  },
  {
    title: "Joy & Celebration",
    artist: "Party Mix",
    frequencies: [330, 349, 392, 440, 494],
  },
  {
    title: "Festive Vibes",
    artist: "Happy Tunes",
    frequencies: [440, 494, 523, 587, 659],
  },
  {
    title: "Birthday Fun",
    artist: "Celebrate",
    frequencies: [262, 294, 330, 349, 392],
  },
  {
    title: "Sparkle & Shine",
    artist: "Magical",
    frequencies: [523, 587, 659, 784, 880],
  },
]

const audioPlayer = document.getElementById("audioPlayer")
const playlistContainer = document.getElementById("playlistContainer")
const songTitle = document.getElementById("songTitle")
const artistName = document.getElementById("artistName")
const playBtn = document.getElementById("playBtn")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const progressFill = document.getElementById("progressFill")
const volumeSlider = document.getElementById("volumeSlider")
const currentTimeDisplay = document.getElementById("currentTime")
const durationDisplay = document.getElementById("duration")

let currentSongIndex = -1
let isPlaying = false
let currentOscillator = null
let currentGainNode = null

if (playlistContainer) {
  songs.forEach((song, index) => {
    const songItem = document.createElement("li")
    songItem.className = "song-item"
    songItem.innerHTML = `
            <div class="song-title">♪ ${song.title}</div>
            <div class="song-artist">${song.artist}</div>
        `

    songItem.addEventListener("click", () => {
      currentSongIndex = index
      loadSong()
      playSong()
    })

    playlistContainer.appendChild(songItem)
  })
}

function loadSong() {
  if (currentSongIndex >= 0 && currentSongIndex < songs.length) {
    const song = songs[currentSongIndex]
    songTitle.textContent = song.title
    artistName.textContent = song.artist

    // Update active state
    document.querySelectorAll(".song-item").forEach((item, index) => {
      item.classList.toggle("active", index === currentSongIndex)
    })
  }
}

function playSong() {
  if (currentSongIndex < 0) return

  stopSong()
  isPlaying = true
  playBtn.textContent = "⏸️"

  const song = songs[currentSongIndex]
  let noteIndex = 0

  function playNote() {
    if (noteIndex < song.frequencies.length && isPlaying) {
      const frequency = song.frequencies[noteIndex]

      currentOscillator = audioContext.createOscillator()
      currentGainNode = audioContext.createGain()

      currentOscillator.connect(currentGainNode)
      currentGainNode.connect(audioContext.destination)

      currentOscillator.frequency.value = frequency
      currentOscillator.type = "sine"

      const volumeValue = volumeSlider ? volumeSlider.value / 100 : 0.5
      currentGainNode.gain.setValueAtTime(volumeValue * 0.1, audioContext.currentTime)
      currentGainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)

      currentOscillator.start(audioContext.currentTime)
      currentOscillator.stop(audioContext.currentTime + 0.4)

      noteIndex++
      setTimeout(playNote, 500)
    } else if (isPlaying) {
      isPlaying = false
      playBtn.textContent = "▶️"
      nextSong()
    }
  }

  playNote()
}

function stopSong() {
  isPlaying = false
  if (currentOscillator) {
    try {
      currentOscillator.stop()
    } catch (e) {}
  }
  playBtn.textContent = "▶️"
}

if (playBtn) {
  playBtn.addEventListener("click", () => {
    if (currentSongIndex < 0) {
      currentSongIndex = 0
      loadSong()
    }

    if (isPlaying) {
      stopSong()
    } else {
      playSong()
    }
  })
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  loadSong()
  playSong()
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
  loadSong()
  playSong()
}

if (nextBtn) {
  nextBtn.addEventListener("click", nextSong)
}

if (prevBtn) {
  prevBtn.addEventListener("click", prevSong)
}

if (volumeSlider) {
  volumeSlider.addEventListener("input", (e) => {
    const volume = e.target.value / 100
    if (currentGainNode) {
      currentGainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime)
    }
  })
}

// Set active navigation link
const currentPage = window.location.pathname.split("/").pop() || "index.html"
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active")
  }
})
