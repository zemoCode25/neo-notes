import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div>
      <div className="w-full flex items-center justify-center gap-5">
        <Input className="w-1/4" placeholder="Search..."></Input>
        <Button className="cursor-pointer">Take Note</Button>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-5 gap-4 my-5">
        <Card className="bg-violet-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
        <Card className="bg-green-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
        <Card className="bg-red-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note
          </p>
        </Card>
        <Card className="bg-amber-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
        <Card className="bg-lime-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
        <Card className="bg-pink-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
        <Card className="bg-violet-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar
          </p>
        </Card>
        <Card className="bg-purple-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
        <Card className="bg-violet-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
        <Card className="bg-violet-50 w-full h-fit rounded-md p-3 mb-4 break-inside-avoid">
          <h1 className="text-lg">NeoNotes AI Notes Features 1</h1>
          <p>
            - Color theme customization - Assign labels to be arranged in the
            dashboard sidebar - Title seach for every note -
            Mobile-responsiveness - Pin priotization - Profile Customization
            AI-features
          </p>
        </Card>
      </div>
    </div>
  );
}
