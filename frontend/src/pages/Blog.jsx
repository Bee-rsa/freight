import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import images
import postImage1 from '../assets/blog/aerial-view-container-cargo-ship-sea_335224-719.jpg';
import postImage2 from '../assets/blog/airplane-track-front-view-generative-ai_188544-7895.jpg';
import postImage3 from '../assets/blog/dynamic-scene-cargo-plane-operation_980928-73445.jpg';
import postImage4 from '../assets/blog/images (2).jpeg';
import postImage5 from '../assets/blog/many-transport-trucks-parked-service-station-sunset-ai-generative_123827-23416.jpg';
import postImage6 from '../assets/blog/interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market_342744-1481.jpg';
import postImage7 from '../assets/blog/logistics-means-transport-together-with-technological-futuristic-holograms_23-2151662911.jpg';
import postImage8 from '../assets/blog/aerial-view-container-cargo-ship-sea_335224-720.jpg';
import newsletterImage from '../assets/empty-business-entrepreneur-office-setup-home-with-personal-computer_482257-91126.jpg'; // Newsletter image

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Freight Transport",
    image: postImage1,
    excerpt: "Exploring the advancements in technology that are shaping the future of freight transport.",
    link: "/future-of-freight",
  },
  {
    id: 2,
    title: "5 Tips for Logistics Management",
    image: postImage2,
    excerpt: "Learn how to optimize your logistics management for better efficiency and cost savings.",
    link: "#",
  },
  {
    id: 3,
    title: "Sustainable Practices in Freight Shipping",
    image: postImage3,
    excerpt: "Understanding the importance of sustainability in the freight industry and how to implement it.",
    link: "#",
  },
  {
    id: 4,
    title: "The Impact of AI on Logistics",
    image: postImage4,
    excerpt: "How artificial intelligence is transforming the logistics sector and enhancing operational efficiency.",
    link: "#",
  },
  {
    id: 5,
    title: "Blockchain in Freight: A Game Changer",
    image: postImage5,
    excerpt: "Examining the potential of blockchain technology to revolutionize freight and shipping.",
    link: "#",
  },
  {
    id: 6,
    title: "Maximizing Supply Chain Visibility",
    image: postImage6,
    excerpt: "Strategies for improving visibility across the supply chain for better decision-making.",
    link: "#",
  },
  {
    id: 7,
    title: "Reducing Freight Costs: Best Practices",
    image: postImage7,
    excerpt: "Top strategies for businesses to reduce their freight costs while maintaining service quality.",
    link: "#",
  },
  {
    id: 8,
    title: "The Role of E-commerce in Freight",
    image: postImage8,
    excerpt: "How the rise of e-commerce is reshaping the logistics and freight landscape.",
    link: "#",
  },
];

const Blog = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      padding: '0rem',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'Poppins, sans-serif', 
      backgroundColor: 'white'
    }}>
      <Header />

      <div style={{
        textAlign: 'center',
        marginBottom: '0rem',
        marginTop: '3rem',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '36px',
          margin: '0',
          textAlign: 'left',
        }}>Blog</h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'left',
        }}>Latest insights and updates from the world of freight.</p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '3',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          padding: '2rem'
        }}>
          {blogPosts.map((post) => (
            <div key={post.id} style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #888', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)', 
              padding: '1rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
              <img src={post.image} alt={post.title} style={{
                width: '100%',
                height: '200px', 
                objectFit: 'cover', 
                borderRadius: '8px',
              }} />
              <h2 style={{
                fontSize: '20px',
                margin: '1rem 0',
              }}>{post.title}</h2>
              <p style={{
                fontSize: '14px',
                color: '#555',
              }}>{post.excerpt}</p>
              <a href={post.link} style={{
                color: '#e79f31',
                textDecoration: 'none',
                fontWeight: 'bold',
                alignSelf: 'flex-start', 
              }}>Read More</a>
            </div>
          ))}
        </div>

        <aside style={{
          flex: '1',
          padding: '1rem',
          backgroundColor: '#BEBEBE',
          borderRadius: '8px',
          marginRight: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginTop: '2rem',
          height: 'auto',
          display: width > 768 ? 'block' : 'none'
        }}>
          <h2 style={{
            fontSize: '20px',
            margin: '0 0 1rem 0',
          }}>About Us</h2>
          <p style={{
            fontSize: '14px',
            marginBottom: '1rem',
          }}>Freight iT is dedicated to revolutionizing the logistics and freight industry through technology and innovation.</p>
          <h2 style={{
            fontSize: '20px',
            margin: '0 0 1rem 0',
          }}>Categories</h2>
          <ul style={{
            listStyle: 'none',
            padding: '0',
          }}>
            <li style={{
              marginBottom: '0.5rem',
            }}><a href="#" style={{
              color: '#000042',
              textDecoration: 'none',
            }}>Logistics</a></li>
            <li style={{
              marginBottom: '0.5rem',
            }}><a href="#" style={{
              color: '#000042',
              textDecoration: 'none',
            }}>Freight</a></li>
            <li style={{
              marginBottom: '0.5rem',
            }}><a href="#" style={{
              color: '#000042',
              textDecoration: 'none',
            }}>Transport</a></li>
          </ul>
        </aside>
      </div>

      {/* Newsletter Section */}
      <div style={{
        marginTop: '4rem',
        marginBottom: '4rem',
        padding: '2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '1',
          display: width > 768 ? 'block' : 'none'
        }}>
          <img src={newsletterImage} alt="Newsletter" style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '16px',
          }} />
        </div>
        <div style={{
          flex: '2',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '0 0 1.5rem 0',
            color: '#333',
          }}>Subscribe to Our Newsletter</h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '2rem',
            color: '#444',
          }}>Stay updated with the latest news and insights in the freight and logistics industry.</p>
          <form style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #bbb',
                width: '70%', 
                fontSize: '16px',
              }} 
              required 
            />
            <button type="submit" style={{
              padding: '1rem 2rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#000042',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            }}>Subscribe</button>
          </form>
        </div>
      </div>
            
      <Footer className="w-full mt-8 p-0" />
    </div>
  );
};

export default Blog;