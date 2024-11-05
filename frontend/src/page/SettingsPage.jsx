import Header from "../component/common/Header";
import ConnectedAccounts from "../component/settings/ConnectedAccounts";
import DangerZone from "../component/settings/DangerZone";
import Notifications from "../component/settings/Notifications";
import Profile from "../component/settings/Profile";
import Security from "../component/settings/Security";
import Sidebar from "../component/common/Sidebar"; // Import the Sidebar component

const SettingsPage = () => {
	return (
		<div className="flex flex-row h-screen w-full">
			{/* Sidebar */}
			<Sidebar /> {/* Render the sidebar on the left */}

			<div className='flex-1 overflow-auto relative z-10 w-full'>
				{/* Header */}
				<Header title="Settings" />

				<main className="max-w-4xl font-poppins mx-auto py-6 px-4 lg:px-8">
					<Profile />
					<Notifications />
					<Security />
					<ConnectedAccounts />
					<DangerZone />
				</main>
			</div>
		</div>
	);
};

export default SettingsPage;
