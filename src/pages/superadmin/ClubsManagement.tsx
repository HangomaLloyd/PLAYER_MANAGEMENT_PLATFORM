import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Plus, Edit, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Club, ClubFormData } from "@/lib/types";

function fetchClubs(): Promise<Club[]> {
  return fetch("/api/auth/clubs").then((res) => res.json());
}

function addClub(data: ClubFormData): Promise<Club> {
  return fetch("/api/auth/clubs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

function updateClub(id: string, data: Partial<ClubFormData>): Promise<Club> {
  return fetch(`/api/auth/clubs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export default function ClubsManagement() {
  const queryClient = useQueryClient();
  const { data: clubs = [], isLoading } = useQuery<Club[]>({ queryKey: ["clubs"], queryFn: fetchClubs });
  const addMutation = useMutation({
    mutationFn: addClub,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clubs"] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<ClubFormData>) => updateClub(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clubs"] }),
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editClub, setEditClub] = useState<Club | null>(null);
  const [form, setForm] = useState<ClubFormData>({
    clubName: "",
    clubDivision: "",
    province: "",
    adminName: "",
    email: "",
    phoneNumber: "",
  });

  const filteredClubs = clubs.filter((c) => {
    const matchesSearch = c.clubName?.toLowerCase().includes(search.toLowerCase()) ||
                         c.province?.toLowerCase().includes(search.toLowerCase()) ||
                         c.adminName?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesDivision = divisionFilter === "all" || c.clubDivision === divisionFilter;
    const matchesProvince = provinceFilter === "all" || c.province === provinceFilter;

    return matchesSearch && matchesStatus && matchesDivision && matchesProvince;
  });

  function handleAdd() {
    addMutation.mutate(form, {
      onSuccess: () => {
        setShowAdd(false);
        setForm({ clubName: "", clubDivision: "", province: "", adminName: "", email: "", phoneNumber: "" });
      },
    });
  }

  function handleEdit() {
    if (editClub) {
      updateMutation.mutate({ id: editClub._id, ...form }, {
        onSuccess: () => {
          setShowEdit(false);
          setEditClub(null);
          setForm({ clubName: "", clubDivision: "", province: "", adminName: "", email: "", phoneNumber: "" });
        },
      });
    }
  }

  function openEdit(club: Club) {
    setEditClub(club);
    setForm({
      clubName: club.clubName || "",
      clubDivision: club.clubDivision || "",
      province: club.province || "",
      adminName: club.adminName || "",
      email: club.email || "",
      phoneNumber: club.phoneNumber || "",
    });
    setShowEdit(true);
  }

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Clubs Management</h1>
        <p className="text-muted-foreground">Manage and oversee all registered football clubs</p>
      </header>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search clubs..."
                  className="pl-10"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={divisionFilter} onValueChange={setDivisionFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Divisions</SelectItem>
                  <SelectItem value="Super League">Super League</SelectItem>
                  <SelectItem value="Division One">Division One</SelectItem>
                  <SelectItem value="Provincial League">Provincial League</SelectItem>
                </SelectContent>
              </Select>
              <Select value={provinceFilter} onValueChange={setProvinceFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Provinces</SelectItem>
                  <SelectItem value="Lusaka">Lusaka</SelectItem>
                  <SelectItem value="Copperbelt">Copperbelt</SelectItem>
                  <SelectItem value="Central">Central</SelectItem>
                  <SelectItem value="Eastern">Eastern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setShowAdd(true)} className="bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Add New Club
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Clubs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Clubs ({filteredClubs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-muted-foreground">Loading clubs...</span>
            </div>
          ) : filteredClubs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clubs found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClubs.map((club) => (
                <div key={club._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {club.clubName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{club.clubName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{club.clubDivision}</span>
                        <span>•</span>
                        <span>{club.province}</span>
                        <span>•</span>
                        <span>{club.adminName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">{club.email}</p>
                      <p className="text-muted-foreground">{club.phoneNumber}</p>
                    </div>
                    <Badge variant={club.status === 'active' ? 'default' : 'secondary'}>
                      {club.status || 'Active'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(club)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Club Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Club</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Club Name</label>
                <Input
                  placeholder="Enter club name"
                  value={form.clubName}
                  onChange={e => setForm(f => ({ ...f, clubName: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Division</label>
                <Select value={form.clubDivision} onValueChange={value => setForm(f => ({ ...f, clubDivision: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super League">Super League</SelectItem>
                    <SelectItem value="Division One">Division One</SelectItem>
                    <SelectItem value="Provincial League">Provincial League</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Province</label>
                <Select value={form.province} onValueChange={value => setForm(f => ({ ...f, province: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lusaka">Lusaka</SelectItem>
                    <SelectItem value="Copperbelt">Copperbelt</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Eastern">Eastern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Admin Name</label>
                <Input
                  placeholder="Enter admin name"
                  value={form.adminName}
                  onChange={e => setForm(f => ({ ...f, adminName: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  placeholder="Enter phone number"
                  value={form.phoneNumber}
                  onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAdd(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} disabled={addMutation.isPending}>
                  {addMutation.isPending ? "Adding..." : "Add Club"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Club Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Club</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Club Name</label>
                <Input
                  placeholder="Enter club name"
                  value={form.clubName}
                  onChange={e => setForm(f => ({ ...f, clubName: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Division</label>
                <Select value={form.clubDivision} onValueChange={value => setForm(f => ({ ...f, clubDivision: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super League">Super League</SelectItem>
                    <SelectItem value="Division One">Division One</SelectItem>
                    <SelectItem value="Provincial League">Provincial League</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Province</label>
                <Select value={form.province} onValueChange={value => setForm(f => ({ ...f, province: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lusaka">Lusaka</SelectItem>
                    <SelectItem value="Copperbelt">Copperbelt</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Eastern">Eastern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Admin Name</label>
                <Input
                  placeholder="Enter admin name"
                  value={form.adminName}
                  onChange={e => setForm(f => ({ ...f, adminName: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  placeholder="Enter phone number"
                  value={form.phoneNumber}
                  onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowEdit(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEdit} disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
