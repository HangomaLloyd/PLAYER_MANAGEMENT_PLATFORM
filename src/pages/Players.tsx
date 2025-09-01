import { useState } from "react";
import { Search, Plus, Eye, Edit, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

const players = [
  {
    id: 1,
    name: "Moses Banda",
    age: 24,
    nrc: "123456789/1",
    position: "Forward",
    status: "Active",
    joined: "Jan 15, 2024",
    club: "Zanaco FC",
    nationality: "Zambian",
    phone: "+260 97 123 4567",
    email: "moses.banda@email.com",
    avatar: "/lovable-uploads/5c3ad949-b867-4e22-9eb2-abae8057b624.png"
  },
  {
    id: 2,
    name: "Patrick Mulenga",
    age: 27,
    nrc: "234567891/1",
    position: "Midfielder",
    status: "Banned",
    joined: "Mar 10, 2023",
    club: "Green Eagles FC",
    nationality: "Zambian",
    phone: "+260 97 234 5678",
    email: "patrick.mulenga@email.com",
    avatar: "/lovable-uploads/5c3ad949-b867-4e22-9eb2-abae8057b624.png"
  },
  {
    id: 3,
    name: "Kennedy Musonda",
    age: 22,
    nrc: "345678911/1",
    position: "Defender",
    status: "Active",
    joined: "Aug 5, 2024",
    club: "Power Dynamos FC",
    nationality: "Zambian",
    phone: "+260 97 345 6789",
    email: "kennedy.musonda@email.com",
    avatar: "/lovable-uploads/5c3ad949-b867-4e22-9eb2-abae8057b624.png"
  },
];

export default function Players() {
  const navigate = useNavigate();
  const { playerId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const selectedPlayer = playerId ? players.find(p => p.id === parseInt(playerId)) : null;

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.nrc.includes(searchTerm) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPlayer) {
    return (
      <div className="flex-1">
        {/* Header */}
        <header className="bg-card border-b px-8 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/players')}
              className="text-primary hover:text-primary/80"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Players
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Player Profile</h1>
              <p className="text-muted-foreground mt-1">{selectedPlayer.name} - Detailed Information</p>
            </div>
          </div>
        </header>

        {/* Player Profile Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-primary-foreground">
                      {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{selectedPlayer.name}</h1>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Position:</span>
                        <span className="ml-2 font-medium">{selectedPlayer.position}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Age:</span>
                        <span className="ml-2 font-medium">{selectedPlayer.age}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Club:</span>
                        <span className="ml-2 font-medium">{selectedPlayer.club}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <Badge 
                          variant={selectedPlayer.status === 'Active' ? 'default' : 'destructive'}
                          className={selectedPlayer.status === 'Active' ? 'bg-success text-success-foreground ml-2' : 'ml-2'}
                        >
                          {selectedPlayer.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">National Registration Card</label>
                    <p className="text-foreground font-medium">{selectedPlayer.nrc}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                    <p className="text-foreground font-medium">{selectedPlayer.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-foreground font-medium">{selectedPlayer.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground font-medium">{selectedPlayer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date Joined</label>
                    <p className="text-foreground font-medium">{selectedPlayer.joined}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Career History */}
              <Card>
                <CardHeader>
                  <CardTitle>Career History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary pl-4">
                      <h4 className="font-semibold text-foreground">{selectedPlayer.club}</h4>
                      <p className="text-sm text-muted-foreground">Current Club • {selectedPlayer.joined} - Present</p>
                      <p className="text-sm text-muted-foreground">Position: {selectedPlayer.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    Disciplinary Records
                  </Button>
                  <Button variant="outline">
                    Transfer History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-card border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Player Management</h1>
            <p className="text-muted-foreground mt-1">Manage all registered players in the FAZ system</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus size={16} className="mr-2" />
            Register New Player
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Players</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search players..." 
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select className="px-3 py-2 border rounded-lg text-sm bg-background">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Banned</option>
                  <option>Injured</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPlayers.map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between p-6 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/players/${player.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                      <span className="text-lg font-bold text-primary-foreground">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg hover:text-primary transition-colors">
                        {player.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>NRC: {player.nrc}</span>
                        <span>•</span>
                        <span>{player.position}</span>
                        <span>•</span>
                        <span>Age: {player.age}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={player.status === 'Active' ? 'default' : 'destructive'}
                      className={player.status === 'Active' ? 'bg-success text-success-foreground' : ''}
                    >
                      {player.status}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/players/${player.id}`);
                      }}
                    >
                      <Eye size={14} className="mr-1" />
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}