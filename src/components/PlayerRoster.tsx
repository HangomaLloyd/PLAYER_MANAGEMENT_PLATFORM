import { Search, Plus, Eye, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const players = [
  {
    id: 1,
    name: "Moses Banda",
    age: 24,
    nrc: "123456789/1",
    position: "Forward",
    status: "Active",
    joined: "Jan 15, 2024",
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
    avatar: "/lovable-uploads/5c3ad949-b867-4e22-9eb2-abae8057b624.png"
  },
];

export default function PlayerRoster() {
  return (
    <div className="bg-card rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 border-b border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Player Roster</h2>
            <p className="text-muted-foreground font-medium">Manage your team members</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-sm font-semibold">
            <Plus size={18} className="mr-2" />
            Add New Player
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex items-center gap-6">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search players by name or NRC..." 
              className="pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary transition-colors bg-white shadow-sm"
            />
          </div>
          <select className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white shadow-sm focus:border-primary transition-colors font-medium">
            <option>All Status</option>
            <option>Active</option>
            <option>Banned</option>
            <option>Injured</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 border-b-2 border-gray-200/50">
              <TableHead className="font-bold text-foreground py-4 px-6">Player</TableHead>
              <TableHead className="font-bold text-foreground py-4">NRC</TableHead>
              <TableHead className="font-bold text-foreground py-4">Position</TableHead>
              <TableHead className="font-bold text-foreground py-4">Status</TableHead>
              <TableHead className="font-bold text-foreground py-4">Joined</TableHead>
              <TableHead className="font-bold text-foreground py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player, index) => (
              <TableRow 
                key={player.id} 
                className="hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TableCell className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-md border-2 border-white">
                        <span className="text-sm font-bold text-primary">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        player.status === 'Active' ? 'bg-success' : 'bg-destructive'
                      }`}></div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">{player.name}</p>
                      <p className="text-sm text-muted-foreground font-medium">Age: {player.age}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">{player.nrc}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm">
                    {player.position}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={player.status === 'Active' ? 'default' : 'destructive'}
                    className={`${
                      player.status === 'Active' 
                        ? 'bg-success hover:bg-success/90 text-success-foreground shadow-md' 
                        : 'shadow-md'
                    } px-3 py-1 font-semibold`}
                  >
                    {player.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-medium">{player.joined}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 hover:bg-accent/10 transition-colors">
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors">
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-gray-200/50 bg-gray-50/30">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-medium">
            Showing <span className="font-semibold text-foreground">1 to 3</span> of <span className="font-semibold text-foreground">24</span> results
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-2 hover:border-primary hover:bg-primary/5">Previous</Button>
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 shadow-md">1</Button>
            <Button variant="outline" size="sm" className="border-2 hover:border-primary hover:bg-primary/5">2</Button>
            <Button variant="outline" size="sm" className="border-2 hover:border-primary hover:bg-primary/5">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}