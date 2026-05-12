import { Announcement, IAnnouncement } from "./model";

export async function getActive(): Promise<IAnnouncement[]> {
  return Announcement.find({ isActive: true }).sort({ order: 1, date: -1 }).lean();
}

export async function getTicker(): Promise<string[]> {
  const items = await Announcement.find({ isActive: true })
    .sort({ priority: -1, order: 1, date: -1 })
    .lean();
  return items.map((a) => a.title + (a.tickerOnly ? "" : ` — ${a.body.slice(0, 80)}...`));
}

export async function create(data: Partial<IAnnouncement>): Promise<IAnnouncement> {
  return Announcement.create(data);
}

export async function update(id: string, data: Partial<IAnnouncement>): Promise<IAnnouncement | null> {
  return Announcement.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
}

export async function remove(id: string): Promise<void> {
  await Announcement.findByIdAndUpdate(id, { $set: { isActive: false } });
}
