"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit2, Shield, Eye, Lock } from "lucide-react"

type UserRole = "admin" | "safety-officer" | "technician" | "viewer"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
}

const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    "View All",
    "Create SDS",
    "Modify SDS",
    "Approve Changes",
    "Manage Users",
    "View Analytics",
    "Export Reports",
  ],
  "safety-officer": ["View All", "Create SDS", "Modify SDS", "Approve Changes", "View Analytics"],
  technician: ["View All", "Create SDS", "Modify SDS"],
  viewer: ["View All"],
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "viewer" as UserRole, department: "" })
  const [selectedRole, setSelectedRole] = useState<UserRole>("viewer")

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    if (savedUsers.length === 0) {
      // Initialize with default admin user
      const defaultUsers: User[] = [
        {
          id: "1",
          name: "Admin User",
          email: "admin@oilserv.com",
          role: "admin",
          department: "Management",
          status: "active",
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      ]
      localStorage.setItem("users", JSON.stringify(defaultUsers))
      setUsers(defaultUsers)
    } else {
      setUsers(savedUsers)
    }
  }, [])

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now().toString(),
        ...newUser,
        role: selectedRole,
        status: "active",
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
      const updatedUsers = [...users, user]
      setUsers(updatedUsers)
      localStorage.setItem("users", JSON.stringify(updatedUsers))
      setNewUser({ name: "", email: "", role: "viewer", department: "" })
      setShowAddUser(false)
    }
  }

  const handleDeleteUser = (id: string) => {
    if (id === "1") {
      alert("Cannot delete the default admin user")
      return
    }
    const updatedUsers = users.filter((u) => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  const handleToggleStatus = (id: string) => {
    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u,
    )
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">User Management</h1>
            <p className="text-slate-400">Manage system users and role-based access control</p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddUser(!showAddUser)}>
            <Plus size={18} />
            Add User
          </Button>
        </div>

        {showAddUser && (
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle>Create New User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
                <Input
                  placeholder="Department"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="safety-officer">Safety Officer</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700">
                  Create User
                </Button>
                <Button onClick={() => setShowAddUser(false)} variant="outline" className="border-slate-600">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-slate-800 border-b border-slate-700">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
              Users ({users.length})
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-blue-600">
              Role Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {users.map((user) => (
              <Card key={user.id} className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "active" ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
                          }`}
                        >
                          {user.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">Email: {user.email}</p>
                      <p className="text-sm text-slate-400">Department: {user.department}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        Last Login: {new Date(user.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 bg-transparent"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "active" ? <Lock size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                        <Edit2 size={16} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            {(Object.keys(rolePermissions) as UserRole[]).map((role) => (
              <Card key={role} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="text-blue-500" size={24} />
                    <div>
                      <CardTitle className="capitalize">{role.replace("-", " ")}</CardTitle>
                      <CardDescription>Permissions for {role} users</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {rolePermissions[role].map((permission) => (
                      <div key={permission} className="flex items-center gap-2 bg-slate-700 p-3 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
