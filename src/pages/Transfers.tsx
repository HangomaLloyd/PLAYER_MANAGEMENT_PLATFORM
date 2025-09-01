import { useState } from "react";
import { Search, Plus, Clock, CheckCircle, XCircle, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const transfers = [
  {
    id: 1,
    playerName: "Moses Banda",
    playerNRC: "123456789/1",
    fromClub: "Zanaco FC",
    toClub: "Green Eagles FC",
    status: "Pending",
    requestDate: "2024-01-15",
    amount: "K50,000",
    type: "Permanent"
  },
  {
    id: 2,
    playerName: "John Phiri",
    playerNRC: "987654321/1",
    fromClub: "Power Dynamos FC",
    toClub: "Nkana FC",
    status: "Approved",
    requestDate: "2024-01-10",
    amount: "K75,000",
    type: "Permanent"
  },
  {
    id: 3,
    playerName: "David Sakala",
    playerNRC: "456789123/1",
    fromClub: "Red Arrows FC",
    toClub: "Zanaco FC",
    status: "Rejected",
    requestDate: "2024-01-08",
    amount: "K30,000",
    type: "Loan"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-success text-success-foreground';
    case 'Rejected':
      return 'bg-destructive text-destructive-foreground';
    case 'Pending':
      return 'bg-warning text-warning-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Approved':
      return <CheckCircle size={16} />;
    case 'Rejected':
      return <XCircle size={16} />;
    case 'Pending':
      return <Clock size={16} />;
    default:
      return <Clock size={16} />;
  }
};

export default function Transfers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTransfer, setNewTransfer] = useState({
    playerNRC: "",
    toClub: "",
    amount: "",
    type: "Permanent"
  });

  const filteredTransfers = transfers.filter(transfer =>
    transfer.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.playerNRC.includes(searchTerm) ||
    transfer.fromClub.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.toClub.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTransfer = () => {
    // Handle transfer submission logic here
    setIsDialogOpen(false);
    setNewTransfer({
      playerNRC: "",
      toClub: "",
      amount: "",
      type: "Permanent"
    });
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-card border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Transfer Management</h1>
            <p className="text-muted-foreground mt-1">Manage player transfers between clubs</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                Initiate New Transfer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Initiate New Transfer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="playerNRC">Player NRC</Label>
                  <Input
                    id="playerNRC"
                    placeholder="Enter player's NRC number"
                    value={newTransfer.playerNRC}
                    onChange={(e) => setNewTransfer({...newTransfer, playerNRC: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="toClub">Destination Club</Label>
                  <Input
                    id="toClub"
                    placeholder="Enter destination club name"
                    value={newTransfer.toClub}
                    onChange={(e) => setNewTransfer({...newTransfer, toClub: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Transfer Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Enter transfer amount (e.g., K50,000)"
                    value={newTransfer.amount}
                    onChange={(e) => setNewTransfer({...newTransfer, amount: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Transfer Type</Label>
                  <select 
                    id="type"
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-background"
                    value={newTransfer.type}
                    onChange={(e) => setNewTransfer({...newTransfer, type: e.target.value})}
                  >
                    <option value="Permanent">Permanent Transfer</option>
                    <option value="Loan">Loan Transfer</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleSubmitTransfer}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Submit Transfer Request
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Transfers</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10 text-warning">
                  <Clock size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved This Month</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="p-3 rounded-lg bg-success/10 text-success">
                  <CheckCircle size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-foreground">K2.4M</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  <ArrowRightLeft size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Transfers</p>
                  <p className="text-2xl font-bold text-foreground">28</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <ArrowRightLeft size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfers Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transfer Requests</CardTitle>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search transfers..." 
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select className="px-3 py-2 border rounded-lg text-sm bg-background">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-6 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <ArrowRightLeft size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{transfer.playerName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>NRC: {transfer.playerNRC}</span>
                        <span>•</span>
                        <span>{transfer.fromClub} → {transfer.toClub}</span>
                        <span>•</span>
                        <span>{transfer.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={getStatusColor(transfer.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(transfer.status)}
                          {transfer.status}
                        </div>
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{transfer.requestDate}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
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