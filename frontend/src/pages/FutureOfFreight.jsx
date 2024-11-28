import postImage1 from '../assets/blog/aerial-view-container-cargo-ship-sea_335224-719.jpg';
import postImage2 from '../assets/images.png';
import postImage3 from '../assets/images (4).jpeg';
import Header from "../components/Header"; // Adjust the path as necessary
import Footer from "../components/Footer";

const FutureOfFreight = () => {
  return (
    <div className="w-full flex flex-col font-poppins items-center bg-white">
      <Header />
      <main className="w-full max-w-7xl p-8 flex flex-col items-center">
        {/* Introduction Section */}
        <article className="flex flex-col text-justify lg:flex-row lg:items-start gap-8">
          {/* Text Section */}
          <section className="lg:w-1/2">
            <header className="mb-6 mt-16">
              <h1 className="text-4xl font-bold mb-8 text-custom-blue">Blog</h1>
              <h2 className="text-2xl font-bold text-gray-800">
                The Future of Freight Transport
              </h2>
              <p className="text-lg text-gray-500">
                Exploring the advancements in technology that are shaping the future of freight transport.
              </p>
            </header>
            <p>
              The freight transport industry is undergoing a profound transformation as technological advancements continue to reshape its landscape. With emerging innovations such as autonomous vehicles, artificial intelligence (AI), and blockchain technology, the logistics sector is becoming more efficient, transparent, and responsive to the growing demands of global trade. These advancements are revolutionizing how goods are moved across the globe, reducing costs, improving safety, and enhancing sustainability.
            </p>
            <p>
              From increasing the speed of delivery to minimizing human error, technology is driving change in every corner of the industry. This article explores how these innovations are influencing key sectors within freight transport: shipping, trucking, courier services, and freight solutions. With a focus on practical applications and future trends, we’ll dive into how technology is not only shaping the present but also defining the future of freight transport across various industries.
            </p>
          </section>

          {/* Image Section */}
          <section className="lg:w-1/2 flex mt-16 sm:mt-4 flex-col justify-center lg:justify-end items-center">
            <img
              src={postImage1}
              alt="Aerial view of a container cargo ship at sea"
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
            <p className="text-sm text-right text-gray-500 mt-2">
              Image source:{" "}
              <a
                href="https://www.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-719.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Freepik
              </a>
            </p>
          </section>
        </article>

     <article className="w-full mt-8 flex flex-col lg:flex-row">
        {/* Section 1: On the left */}
        <section className="lg:w-1/2 pr-8 bg-gray-100 p-8 rounded-lg shadow-lg">
  <h2 className="text-xl font-semibold text-custom-blue mb-4 mt-6 p-4 rounded-md">
    1. Autonomous Vehicles and Smart Trucks in the Trucking Industry
  </h2>
  <p>
    The introduction of autonomous vehicles (AVs) promises to dramatically alter the trucking industry...
  </p>
  <ul className="list-disc text-justify pl-6">
    <li><strong>Increased Safety:</strong> AVs are equipped with sensors, cameras, and machine learning algorithms...</li>
    <li><strong>Efficiency and Cost Reduction:</strong> By operating 24/7 without the need for rest breaks...</li>
    <li><strong>Impact on the Labor Market:</strong> While autonomous vehicles promise efficiency, they also raise concerns...</li>
  </ul>
  <p>
    The trucking sector is also incorporating electric vehicles (EVs), such as Tesla’s Semi, to reduce carbon emissions...
  </p>
</section>


        {/* Section 2: On the right */}
        <section className="lg:w-1/2 pr-8 ml-12 mt-8 sm:mt-4 p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-custom-blue mb-4 mt-6">
            2. Sustainable Freight Solutions and Green Logistics
            </h2>
            <p>
            Environmental concerns are pushing the freight industry toward green alternatives. Some of the most prominent developments include:
            </p>
            <ul className="list-disc text-justify pl-6">
            <li><strong>Electric Vehicles (EVs):</strong> Companies are adopting electric trucks to lower carbon emissions...</li>
            <li><strong>Hydrogen Fuel Cells:</strong> Hydrogen-powered vehicles are emerging as an alternative...</li>
            <li><strong>Eco-optimized logistics:</strong> Data analytics ensures routes are planned to minimize fuel consumption...</li>
            </ul>
            <p>
            The long-term savings and environmental benefits of these solutions position sustainability as a core driver...
            </p>
        </section>
        </article>


        <article className="w-full mt-8 flex flex-col lg:flex-row">
          <section className="lg:w-1/2 text-justify pr-8">
            <h2 className="text-xl font-semibold text-justify text-custom-blue mb-4 mt-6">3. Digitalization and Blockchain in Freight Management</h2>
            <p>
              In recent years, digitalization has been a game-changer in how freight services are managed. Blockchain technology, for instance, provides a decentralized and secure method to track and verify transactions and cargo movement, ensuring greater transparency and reducing the risk of fraud. This is especially crucial in international shipping, where goods often pass through various jurisdictions, and digital documentation can streamline the entire process.
            </p>
            <p>
              The integration of AI in freight management systems also optimizes routing, delivery scheduling, and predictive maintenance, making operations more efficient. Furthermore, the implementation of blockchain can significantly reduce paperwork, improve communication between parties, and ensure that all stakeholders—from suppliers to customers—have access to real-time data on the status of shipments.
            </p>
          </section>
          <section className="lg:w-1/2 flex flex-col justify-center lg:justify-end items-center">
            <img
              src={postImage2}
              alt="Aerial view of a container cargo ship at sea"
              className="w-full max-w-lg md:mt-8 sm:mt-8 rounded-lg shadow-lg"
            />
            <p className="text-sm text-right text-gray-500 mt-2">
              Image source:{" "}
              <a
                href="https://www.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-719.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Freepik
              </a>
            </p>
          </section>
        </article>

        <article className="w-full text-justify mt-8">
          <h2 className="text-xl font-semibold text-justify text-custom-blue mb-4 mt-6">4. Hyperloop and High-Speed Freight Transport</h2>
          <p>
          A potentially game-changing technology for freight transport is the hyperloop, a proposed high-speed transportation system that could radically change how goods are moved. Developed by Elon Musk’s Boring Company and other innovators, hyperloop uses magnetic levitation and vacuum tubes to transport cargo at speeds exceeding 700 miles per hour.
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Speed:</strong> Hyperloop could cut transit times significantly, making it possible to move goods between major cities in a fraction of the time compared to traditional methods.</li>
            <li><strong>Energy Efficiency:</strong> Hyperloop systems are designed to be more energy-efficient than current rail and air transport options, making them a sustainable alternative for high-value goods and time-sensitive freight.</li>
            <li><strong>High-Capacity:</strong>Hyperloop can move large volumes of cargo, providing an alternative to overburdened road and rail networks.</li>
          </ul>
          <p>
          Hyperloop can move large volumes of cargo, providing an alternative to overburdened road and rail networks.
          </p>
        </article>

        {/* Conclusion */}
        <article className="w-full mt-8 flex flex-col lg:flex-row">
          <section className="lg:w-1/2 text-justify pr-8">
            <h2 className="text-xl font-semibold text-justify text-custom-blue mb-4 mt-6">Conclusion</h2>
            <p>
              The future of freight transport is being shaped by groundbreaking technologies and a global drive towards sustainability. Autonomous vehicles, AI-driven systems, blockchain technology, and electric vehicles are paving the way for a new era in logistics. These innovations are not just enhancing operational efficiency; they are transforming the entire freight landscape, making it safer, faster, and greener.
            </p>
            <p>
              As the industry continues to evolve, it’s clear that these advancements will lead to more seamless, reliable, and sustainable freight services. The rise of smart technologies promises to revolutionize how goods are transported, creating new opportunities for companies and driving the freight transport industry toward a more efficient and eco-conscious future.
            </p>
          </section>
          <section className="lg:w-1/2 flex flex-col sm:mt-4 justify-center lg:justify-end items-center">
            <img
              src={postImage3}
              alt="Aerial view of a container cargo ship at sea"
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
            <p className="text-sm text-right text-gray-500 mt-2">
              Image source:{" "}
              <a
                href="https://www.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-719.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Freepik
              </a>
            </p>
          </section>
        </article>
        
      </main>
      
      <Footer className="w-full mt-8" />
    </div>
  );
};

export default FutureOfFreight;
