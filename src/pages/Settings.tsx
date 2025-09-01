import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Database, Palette, Globe } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-card border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your FAZ system preferences and configurations</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-8 max-w-4xl">
        <div className="space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User size={20} className="text-primary" />
                </div>
                <CardTitle>Profile Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Mwanza" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.mwanza@faz.zm" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+260 97 123 4567" />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Save Profile Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Bell size={20} className="text-accent" />
                </div>
                <CardTitle>Notification Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transfer Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about transfer activities</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Match Updates</p>
                  <p className="text-sm text-muted-foreground">Receive match result notifications</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Maintenance</p>
                  <p className="text-sm text-muted-foreground">Get alerts about system updates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Shield size={20} className="text-success" />
                </div>
                <CardTitle>Security & Privacy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline">
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Database size={20} className="text-warning" />
                  </div>
                  <CardTitle>Data Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Export Player Data
                </Button>
                <Button variant="outline" className="w-full">
                  Backup System Data
                </Button>
                <Button variant="outline" className="w-full">
                  Import Players
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Palette size={20} className="text-destructive" />
                  </div>
                  <CardTitle>Appearance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background">
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                    <option>System Default</option>
                  </select>
                </div>
                <div>
                  <Label>Language</Label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background">
                    <option>English</option>
                    <option>Bemba</option>
                    <option>Nyanja</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Organization Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe size={20} className="text-primary" />
                </div>
                <CardTitle>Organization Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue="Football Association of Zambia" />
              </div>
              <div>
                <Label htmlFor="orgAddress">Address</Label>
                <Input id="orgAddress" defaultValue="Football House, Lusaka, Zambia" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgPhone">Phone</Label>
                  <Input id="orgPhone" defaultValue="+260 211 123 456" />
                </div>
                <div>
                  <Label htmlFor="orgEmail">Email</Label>
                  <Input id="orgEmail" defaultValue="info@faz.zm" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Save Organization Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}